import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DashboardTilesComponent } from '../components/dashboard-tiles/dashboard-tiles';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardTilesComponent],
  template: `
    <div class="home-container">
      <h1>Welcome Home</h1>
      <p>You have successfully logged in.</p>
      @if (authService.isAuthenticated()) {
        <app-dashboard-tiles></app-dashboard-tiles>
        <button class="logout-btn" (click)="authService.logout()">Logout</button>
      }
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      padding: 2rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #555;
    }

    .logout-btn {
      margin-top: 1.5rem;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      background-color: #e53935;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .logout-btn:hover {
      background-color: #b71c1c;
    }
  `]
})
export class Home {
  constructor(public authService: AuthService) {}
}