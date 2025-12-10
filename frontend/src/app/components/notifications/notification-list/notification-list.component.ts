import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/notification.model';

@Component({
    selector: 'app-notification-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>🔔 Notifications</h1>
        <span class="notification-count">{{ notifications.length }} notification(s)</span>
      </div>

      <div class="notifications-list" *ngIf="notifications.length > 0; else noNotifications">
        <div class="notification-card" *ngFor="let notification of notifications" 
             [class.sent]="notification.sent">
          <div class="notification-icon">
            {{ notification.sent ? '✅' : '📬' }}
          </div>
          <div class="notification-content">
            <p class="notification-message">{{ notification.message }}</p>
            <span class="notification-recipient">
              📧 {{ notification.recipientEmail }}
            </span>
          </div>
          <div class="notification-actions">
            <span class="notification-status" [class.sent]="notification.sent">
              {{ notification.sent ? 'Envoyée' : 'En attente' }}
            </span>
            <button (click)="deleteNotification(notification.id!)" class="btn-delete">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <ng-template #noNotifications>
        <div class="empty-state">
          <span class="empty-icon">🔕</span>
          <h3>Aucune notification</h3>
          <p>Les notifications apparaîtront ici lorsqu'un participant s'inscrira</p>
        </div>
      </ng-template>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 2rem;
      max-width: 900px;
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

    .notification-count {
      background: #f0f0ff;
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .notifications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .notification-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-left: 4px solid #ff9800;
    }

    .notification-card.sent {
      border-left-color: #4caf50;
    }

    .notification-card:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .notification-icon {
      font-size: 2rem;
      min-width: 50px;
      text-align: center;
    }

    .notification-content {
      flex: 1;
    }

    .notification-message {
      color: #333;
      margin: 0 0 0.5rem 0;
      line-height: 1.5;
    }

    .notification-recipient {
      color: #888;
      font-size: 0.9rem;
    }

    .notification-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .notification-status {
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      background: #fff3e0;
      color: #ff9800;
    }

    .notification-status.sent {
      background: #e8f5e9;
      color: #4caf50;
    }

    .btn-delete {
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      background: #fdeaea;
      font-size: 1rem;
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
    }
  `]
})
export class NotificationListComponent implements OnInit {
    notifications: Notification[] = [];

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.loadNotifications();
    }

    loadNotifications(): void {
        this.notificationService.getAll().subscribe({
            next: (data) => this.notifications = data,
            error: (err) => console.error('Erreur lors du chargement', err)
        });
    }

    deleteNotification(id: number): void {
        if (confirm('Voulez-vous supprimer cette notification ?')) {
            this.notificationService.delete(id).subscribe({
                next: () => this.loadNotifications(),
                error: (err) => console.error('Erreur lors de la suppression', err)
            });
        }
    }
}
