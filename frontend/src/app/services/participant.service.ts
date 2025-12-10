import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {
    private apiUrl = 'http://localhost:8080/participants';

    constructor(private http: HttpClient) { }

    // Récupérer tous les participants
    getAll(): Observable<Participant[]> {
        return this.http.get<Participant[]>(this.apiUrl);
    }

    // Récupérer un participant par ID
    getById(id: number): Observable<Participant> {
        return this.http.get<Participant>(`${this.apiUrl}/${id}`);
    }

    // Inscrire un nouveau participant
    create(participant: Participant): Observable<Participant> {
        return this.http.post<Participant>(this.apiUrl, participant);
    }

    // Mettre à jour un participant
    update(id: number, participant: Participant): Observable<Participant> {
        return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant);
    }

    // Désinscrire un participant
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
