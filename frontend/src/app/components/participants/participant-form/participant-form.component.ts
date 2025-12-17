import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="form-card">
        <h1>{{ isEditMode ? '✏️ Modifier' : '📝 Inscrire' }} un participant</h1>
        
        <form (ngSubmit)="onSubmit()" #participantForm="ngForm">
          <div class="form-group">
            <label for="nom">Nom complet</label>
            <input 
              type="text" 
              id="nom" 
              name="nom" 
              [(ngModel)]="participant.nom" 
              required
              placeholder="Ex: Ahmed Benali"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="participant.email" 
              required
              placeholder="Ex: ahmed@example.com"
            >
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="participant.password" 
              [required]="!isEditMode"
              placeholder="********"
            >
          </div>

          <div class="form-group">
            <label for="statut">Statut</label>
            <select id="statut" name="statut" [(ngModel)]="participant.statut">
              <option value="inscrit">Inscrit</option>
              <option value="confirmé">Confirmé</option>
              <option value="annulé">Annulé</option>
            </select>
          </div>

          <div class="info-box" *ngIf="!isEditMode">
            <span class="info-icon">💡</span>
            <p>Une notification de confirmation sera automatiquement envoyée au participant lors de l'inscription.</p>
          </div>

          <div class="form-actions">
            <a routerLink="/participants" class="btn-secondary">Annuler</a>
            <button type="submit" class="btn-primary" [disabled]="!participantForm.valid">
              {{ isEditMode ? 'Mettre à jour' : 'Inscrire' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 600px;
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
    .form-group select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .info-box {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      background: #f0f7ff;
      border-radius: 10px;
      margin-bottom: 1.5rem;
    }

    .info-icon {
      font-size: 1.25rem;
    }

    .info-box p {
      margin: 0;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.5;
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
export class ParticipantFormComponent implements OnInit {
  participant: Participant = {
    nom: '',
    email: '',
    statut: 'inscrit'
  };
  isEditMode = false;

  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.participantService.getById(+id).subscribe({
        next: (data) => this.participant = data,
        error: (err) => console.error('Erreur lors du chargement', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.participant.id) {
      this.participantService.update(this.participant.id, this.participant).subscribe({
        next: () => this.router.navigate(['/participants']),
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
    } else {
      this.participantService.create(this.participant).subscribe({
        next: () => this.router.navigate(['/participants']),
        error: (err) => console.error('Erreur lors de l\'inscription', err)
      });
    }
  }
}
