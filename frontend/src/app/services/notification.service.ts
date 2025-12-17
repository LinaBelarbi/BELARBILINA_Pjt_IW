import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://localhost:8083/notifications';

    constructor(private http: HttpClient) { }

    // Récupérer toutes les notifications
    getAll(): Observable<Notification[]> {
        return this.http.get<Notification[]>(this.apiUrl);
    }

    // Récupérer une notification par ID
    getById(id: number): Observable<Notification> {
        return this.http.get<Notification>(`${this.apiUrl}/${id}`);
    }

    // Créer une notification
    create(notification: Notification): Observable<Notification> {
        return this.http.post<Notification>(this.apiUrl, notification);
    }

    // Supprimer une notification
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
