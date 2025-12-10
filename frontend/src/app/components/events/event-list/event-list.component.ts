import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>🎉 Événements</h1>
        <a routerLink="/events/new" class="btn-primary">
          <span>➕</span> Nouvel événement
        </a>
      </div>

      <div class="events-grid" *ngIf="events.length > 0; else noEvents">
        <div class="event-card" *ngFor="let event of events">
          <div class="event-header">
            <h3>{{ event.titre }}</h3>
            <span class="event-date">📅 {{ event.date }}</span>
          </div>
          <p class="event-description">{{ event.description }}</p>
          <div class="event-location">
            <span>📍 {{ event.lieu }}</span>
          </div>
          <div class="event-actions">
            <a [routerLink]="['/events', event.id]" class="btn-edit">✏️ Modifier</a>
            <button (click)="deleteEvent(event.id!)" class="btn-delete">🗑️ Supprimer</button>
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
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAll().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur lors du chargement des événements', err)
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
}
