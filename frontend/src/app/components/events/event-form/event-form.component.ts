import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="form-card">
        <h1>{{ isEditMode ? '✏️ Modifier' : '➕ Nouvel' }} événement</h1>
        
        <form (ngSubmit)="onSubmit()" #eventForm="ngForm">
          <div class="form-group">
            <label for="titre">Titre de l'événement</label>
            <input 
              type="text" 
              id="titre" 
              name="titre" 
              [(ngModel)]="event.titre" 
              required
              placeholder="Ex: Conférence IA 2025"
            >
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              name="description" 
              [(ngModel)]="event.description" 
              rows="4"
              placeholder="Décrivez votre événement..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="lieu">Lieu</label>
              <input 
                type="text" 
                id="lieu" 
                name="lieu" 
                [(ngModel)]="event.lieu" 
                placeholder="Ex: Casablanca"
              >
            </div>

            <div class="form-group">
              <label for="date">Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                [(ngModel)]="event.date"
              >
            </div>
          </div>

          <div class="form-actions">
            <a routerLink="/events" class="btn-secondary">Annuler</a>
            <button type="submit" class="btn-primary" [disabled]="!eventForm.valid">
              {{ isEditMode ? 'Mettre à jour' : 'Créer l\\'événement' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 700px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .form-card h1 {
      color: #333;
      margin-bottom: 2rem;
      font-size: 1.75rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #666;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }
  `]
})
export class EventFormComponent implements OnInit {
  event: Event = {
    titre: '',
    description: '',
    lieu: '',
    date: ''
  };
  isEditMode = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventService.getById(+id).subscribe({
        next: (data) => this.event = data,
        error: (err) => console.error('Erreur lors du chargement', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.event.id) {
      this.eventService.update(this.event.id, this.event).subscribe({
        next: () => this.router.navigate(['/events']),
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
    } else {
      this.eventService.create(this.event).subscribe({
        next: () => this.router.navigate(['/events']),
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }
}
