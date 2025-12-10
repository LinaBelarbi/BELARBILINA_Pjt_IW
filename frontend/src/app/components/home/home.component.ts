import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ParticipantService } from '../../services/participant.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>🎉 Bienvenue sur GestionEvent</h1>
        <p class="hero-subtitle">Plateforme de gestion d'événements moderne et intuitive</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card events">
          <div class="stat-icon">📅</div>
          <div class="stat-info">
            <span class="stat-number">{{ eventCount }}</span>
            <span class="stat-label">Événements</span>
          </div>
          <a routerLink="/events" class="stat-link">Voir tous →</a>
        </div>

        <div class="stat-card participants">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <span class="stat-number">{{ participantCount }}</span>
            <span class="stat-label">Participants</span>
          </div>
          <a routerLink="/participants" class="stat-link">Voir tous →</a>
        </div>

        <div class="stat-card notifications">
          <div class="stat-icon">🔔</div>
          <div class="stat-info">
            <span class="stat-number">{{ notificationCount }}</span>
            <span class="stat-label">Notifications</span>
          </div>
          <a routerLink="/notifications" class="stat-link">Voir toutes →</a>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Actions Rapides</h2>
        <div class="actions-grid">
          <a routerLink="/events/new" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-text">Créer un événement</span>
          </a>
          <a routerLink="/participants/new" class="action-card">
            <span class="action-icon">📝</span>
            <span class="action-text">Inscrire un participant</span>
          </a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .home-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-section {
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
      margin-bottom: 2rem;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    }

    .hero-section h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .stat-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
    }

    .stat-label {
      color: #666;
      font-size: 1rem;
    }

    .stat-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .stat-link:hover {
      color: #764ba2;
    }

    .quick-actions {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .quick-actions h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      text-decoration: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .action-icon {
      font-size: 1.5rem;
    }

    .action-text {
      font-weight: 500;
    }
  `]
})
export class HomeComponent implements OnInit {
    eventCount = 0;
    participantCount = 0;
    notificationCount = 0;

    constructor(
        private eventService: EventService,
        private participantService: ParticipantService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.eventService.getAll().subscribe({
            next: (events) => this.eventCount = events.length,
            error: () => this.eventCount = 0
        });

        this.participantService.getAll().subscribe({
            next: (participants) => this.participantCount = participants.length,
            error: () => this.participantCount = 0
        });

        this.notificationService.getAll().subscribe({
            next: (notifications) => this.notificationCount = notifications.length,
            error: () => this.notificationCount = 0
        });
    }
}
