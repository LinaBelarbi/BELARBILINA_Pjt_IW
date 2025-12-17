import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8081/events';

    constructor(private http: HttpClient) { }

    // Récupérer tous les événements
    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl);
    }

    // Récupérer un événement par ID
    getById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${id}`);
    }

    // Créer un nouvel événement
    create(event: Event): Observable<Event> {
        return this.http.post<Event>(this.apiUrl, event);
    }

    // Mettre à jour un événement
    update(id: number, event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
    }

    // Supprimer un événement
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
