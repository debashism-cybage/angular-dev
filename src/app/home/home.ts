import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DashboardTilesComponent } from '../components/dashboard-tiles/dashboard-tiles';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardTilesComponent],
  template: `
    <div class="home-container">
      <h1>{{ welcomeMessage }}</h1>
      @if (authService.isAuthenticated()) {
        <app-dashboard-tiles></app-dashboard-tiles>
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
  `]
})
export class Home {
  constructor(public authService: AuthService) {}

  get welcomeMessage(): string {
    const user = this.authService.user();

    if (!user) {
      return 'Welcome guest';
    }

    const name = user.displayName?.trim() || user.email?.trim();
    return name ? `Welcome ${name}` : 'Welcome guest';
  }
}