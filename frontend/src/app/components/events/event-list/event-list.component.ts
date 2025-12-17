import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { ParticipantService } from '../../../services/participant.service';
import { Event } from '../../../models/event.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>🎉 Événements</h1>
        <div class="actions-header">
            <div class="search-bar">
                <span class="search-icon">🔍</span>
                <input 
                    type="text" 
                    [(ngModel)]="searchTerm" 
                    (ngModelChange)="onSearch()"
                    placeholder="Rechercher un événement..."
                    class="search-input"
                >
            </div>
            <a routerLink="/events/new" class="btn-primary">
            <span>➕</span> Nouvel événement
            </a>
        </div>
      </div>

      <div class="events-grid" *ngIf="filteredEvents.length > 0; else noEvents">
        <div class="event-card" *ngFor="let event of filteredEvents">
          <div class="event-image" *ngIf="event.imageUrl">
            <img [src]="event.imageUrl" [alt]="event.titre">
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3>{{ event.titre }}</h3>
              <span class="event-date">📅 {{ event.date }}</span>
            </div>
            <div class="stats-badge">
              👥 {{ participantCounts[event.id!] || 0 }} participants
            </div>
            <p class="event-description">{{ event.description }}</p>
            <div class="event-location">
              <span>📍 {{ event.lieu }}</span>
            </div>
            <div class="event-document" *ngIf="event.documentUrl">
              <a [href]="event.documentUrl" target="_blank" class="doc-link">
                📄 Voir le document joint
              </a>
            </div>
            <div class="event-actions">
              <ng-container *ngIf="authService.isAdmin()">
                  <a [routerLink]="['/events', event.id]" class="btn-edit">✏️ Modifier</a>
                  <button (click)="deleteEvent(event.id!)" class="btn-delete">🗑️ Supprimer</button>
              </ng-container>
              <ng-container *ngIf="authService.isParticipant()">
                  <button (click)="participate(event)" class="btn-primary">Participer</button>
              </ng-container>
            </div>
          </div>
        </div>
      </div>

      <ng-template #noEvents>
        <div class="empty-state">
          <span class="empty-icon">📭</span>
          <h3>Aucun événement</h3>
          <p>Commencez par créer votre premier événement</p>
          <a routerLink="/events/new" class="btn-primary">Créer un événement</a>
        </div>
      </ng-template>


    </div>
  `,
  styles: [`
    .error-alert {
      background: #ffebee;
      color: #c62828;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      border: 1px solid #ef9a9a;
    }
    .debug-box {
        background: #eee;
        padding: 10px;
        margin-top: 20px;
        word-break: break-all;
        font-family: monospace;
    }
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      color: #333;
      font-size: 2rem;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 500;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .event-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .event-image {
      height: 200px;
      width: 100%;
      background: #f0f0f0;
    }

    .event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .event-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .event-header h3 {
      color: #333;
      margin: 0;
      font-size: 1.25rem;
    }

    .event-date {
      background: #f0f0ff;
      color: #667eea;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      white-space: nowrap;
    }

    .stats-badge {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .event-description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .event-location {
      color: #888;
      margin-bottom: 1rem;
    }

    .event-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }
    
    .event-document {
      margin-bottom: 1rem;
    }

    .doc-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem;
      background: #f0f0ff;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .doc-link:hover {
      background: #e0e0f0;
      text-decoration: underline;
    }

    .btn-edit, .btn-delete {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      border: none;
    }

    .btn-edit {
      background: #e8f4fd;
      color: #2196f3;
    }

    .btn-edit:hover {
      background: #2196f3;
      color: white;
    }

    .btn-delete {
      background: #fdeaea;
      color: #f44336;
    }

    .btn-delete:hover {
      background: #f44336;
      color: white;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .empty-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }



    .empty-state p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .actions-header {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-bar {
      position: relative;
      width: 300px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      outline: none;
    }

    .search-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
      pointer-events: none;
    }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  participantCounts: { [key: number]: number } = {};
  searchTerm: string = '';
  errorMessage: string = '';
  debugInfo: string = 'Loading...';

  constructor(
    private eventService: EventService,
    private participantService: ParticipantService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAll().subscribe({
      next: (data) => {
        this.events = data;
        this.filterEvents();
        this.events.forEach(event => {
          if (event.id) {
            this.participantService.getParticipantCount(event.id).subscribe(
              (count: number) => this.participantCounts[event.id!] = count
            );
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements', err);
        this.errorMessage = 'Erreur lors du chargement des événements.';
      }
    });
  }

  deleteEvent(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.delete(id).subscribe({
        next: () => this.loadEvents(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  participate(event: Event): void {
    const user = this.authService.currentUserValue;
    if (user && user.role === 'PARTICIPANT') {
      // Update Participant with new Event ID
      // Note: In a real app we might have a Many-to-Many or a separate "Participation" entity
      // Here we follow the existing model where Participant has one eventId
      // Or we create a new "Participant" entry for this event if the user is a generic "User"
      // Given the current simple model: Participant IS the registration.

      // Strategy: Create a NEW registration for this user for this event
      // We need the user's details (Name, Email)
      const newRegistration = {
        nom: user.nom,
        email: user.email,
        statut: 'inscrit',
        eventId: event.id,
        password: user.password // Keep password for future logins
      };

      this.participantService.create(newRegistration).subscribe({
        next: () => {
          alert(`Félicitations ! Vous êtes inscrit à l'événement : ${event.titre}`);
          this.loadEvents(); // Refresh counts
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription', err);
          alert('Erreur lors de l\'inscription.');
        }
      });
    }
  }

  onSearch(): void {
    this.filterEvents();
  }

  private filterEvents(): void {
    if (!this.searchTerm) {
      this.filteredEvents = this.events;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.titre.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      event.lieu.toLowerCase().includes(term)
    );
  }
}
