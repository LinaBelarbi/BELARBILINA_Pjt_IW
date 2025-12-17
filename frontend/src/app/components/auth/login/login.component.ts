import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for ngIf/ngFor
import { FormsModule } from '@angular/forms'; // Important for ngModel
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="card">
        <h2>Connexion</h2>
        
        <div class="form-group">
          <label>Rôle</label>
          <select [(ngModel)]="role" class="form-control">
            <option value="PARTICIPANT">Participant</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" class="form-control" name="email" required>
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" [(ngModel)]="password" class="form-control" name="password" required>
        </div>

        <button (click)="onLogin()" class="btn btn-primary">Se connecter</button>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div *ngIf="role === 'PARTICIPANT'" class="register-link">
          <p>Pas encore de compte ? <a routerLink="/participants/new">S'inscrire</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      background-color: #f4f7f6;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      position: relative;
      z-index: 10;
    }
    h2 { text-align: center; margin-bottom: 1.5rem; color: #333; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; color: #666; }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
    }
    .btn:hover { background-color: #0056b3; }
    .error-message {
      color: #dc3545;
      text-align: center;
      margin-top: 1rem;
    }
    .register-link {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    a { color: #007bff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  `]
})
export class LoginComponent {
  role: string = 'PARTICIPANT';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.role, this.email, this.password).then((success: boolean) => {
      if (success) {
        this.router.navigate(['/events']);
      } else {
        this.errorMessage = 'Identifiants incorrects';
      }
    });
  }
}
