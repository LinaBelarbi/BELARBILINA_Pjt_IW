import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from './participant.service';
import { Participant } from '../models/participant.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private router: Router, private participantService: ParticipantService) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(role: string, email: string, password: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (role === 'ADMIN') {
                if (email === 'admin@test.com' && password === 'admin123') {
                    const adminUser = { name: 'Administrateur', role: 'ADMIN', email: email };
                    localStorage.setItem('currentUser', JSON.stringify(adminUser));
                    this.currentUserSubject.next(adminUser);
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                // Participant Login
                const loginRequest: any = { email: email, password: password };
                this.participantService.login(loginRequest).subscribe({
                    next: (participant) => {
                        if (participant) {
                            const user = { ...participant, role: 'PARTICIPANT' };
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            this.currentUserSubject.next(user);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: () => resolve(false)
                });
            }
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAdmin(): boolean {
        const user = this.currentUserValue;
        return user && user.role === 'ADMIN';
    }

    isParticipant(): boolean {
        const user = this.currentUserValue;
        return user && user.role === 'PARTICIPANT';
    }
}
