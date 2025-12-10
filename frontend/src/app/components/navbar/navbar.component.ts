import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/" class="logo">
          <span class="logo-icon">📅</span>
          <span class="logo-text">GestionEvent</span>
        </a>
      </div>
      <ul class="navbar-menu">
        <li>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <span class="nav-icon">🏠</span> Accueil
          </a>
        </li>
        <li>
          <a routerLink="/events" routerLinkActive="active">
            <span class="nav-icon">🎉</span> Événements
          </a>
        </li>
        <li>
          <a routerLink="/participants" routerLinkActive="active">
            <span class="nav-icon">👥</span> Participants
          </a>
        </li>
        <li>
          <a routerLink="/notifications" routerLinkActive="active">
            <span class="nav-icon">🔔</span> Notifications
          </a>
        </li>
      </ul>
    </nav>
  `,
    styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    }

    .navbar-brand .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .navbar-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.5rem;
    }

    .navbar-menu a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .navbar-menu a:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: translateY(-2px);
    }

    .navbar-menu a.active {
      background: rgba(255, 255, 255, 0.25);
      color: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .nav-icon {
      font-size: 1.1rem;
    }
  `]
})
export class NavbarComponent { }
