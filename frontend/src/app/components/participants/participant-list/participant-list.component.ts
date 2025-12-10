import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../models/participant.model';

@Component({
    selector: 'app-participant-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>👥 Participants</h1>
        <a routerLink="/participants/new" class="btn-primary">
          <span>➕</span> Inscrire un participant
        </a>
      </div>

      <div class="table-container" *ngIf="participants.length > 0; else noParticipants">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let participant of participants">
              <td>{{ participant.id }}</td>
              <td>
                <div class="participant-info">
                  <span class="avatar">{{ participant.nom?.charAt(0) || '?' }}</span>
                  {{ participant.nom }}
                </div>
              </td>
              <td>{{ participant.email }}</td>
              <td>
                <span class="status-badge" [class]="participant.statut">
                  {{ participant.statut }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/participants', participant.id]" class="btn-edit">✏️</a>
                  <button (click)="deleteParticipant(participant.id!)" class="btn-delete">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noParticipants>
        <div class="empty-state">
          <span class="empty-icon">👤</span>
          <h3>Aucun participant</h3>
          <p>Commencez par inscrire votre premier participant</p>
          <a routerLink="/participants/new" class="btn-primary">Inscrire un participant</a>
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
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .table-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 1rem 1.5rem;
      text-align: left;
    }

    .data-table th {
      background: #f8f9fa;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85rem;
    }

    .data-table tbody tr {
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s ease;
    }

    .data-table tbody tr:hover {
      background: #fafafa;
    }

    .participant-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .status-badge.inscrit {
      background: #e8f5e9;
      color: #4caf50;
    }

    .status-badge.confirmé {
      background: #e3f2fd;
      color: #2196f3;
    }

    .status-badge.annulé {
      background: #ffebee;
      color: #f44336;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-edit, .btn-delete {
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      border: none;
      font-size: 1rem;
    }

    .btn-edit {
      background: #e8f4fd;
    }

    .btn-edit:hover {
      background: #2196f3;
    }

    .btn-delete {
      background: #fdeaea;
    }

    .btn-delete:hover {
      background: #f44336;
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
export class ParticipantListComponent implements OnInit {
    participants: Participant[] = [];

    constructor(private participantService: ParticipantService) { }

    ngOnInit(): void {
        this.loadParticipants();
    }

    loadParticipants(): void {
        this.participantService.getAll().subscribe({
            next: (data) => this.participants = data,
            error: (err) => console.error('Erreur lors du chargement', err)
        });
    }

    deleteParticipant(id: number): void {
        if (confirm('Voulez-vous vraiment désinscrire ce participant ?')) {
            this.participantService.delete(id).subscribe({
                next: () => this.loadParticipants(),
                error: (err) => console.error('Erreur lors de la suppression', err)
            });
        }
    }
}
