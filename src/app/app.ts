import { Component, inject, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    @if (isAuthenticated()) {
      <nav class="top-nav" aria-label="Main navigation">
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/contact-us" routerLinkActive="active">Contact Us</a>
        </div>
        <button class="logout-btn" (click)="logout()">Logout</button>
      </nav>
    }
    <router-outlet />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100dvh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      position: relative;
    }

    .top-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(8px);
      z-index: 1000;
      border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: auto;
    }

    .nav-links a {
      color: #e2e8f0;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .nav-links a.active {
      background: rgba(96, 165, 250, 0.2);
      color: #bfdbfe;
    }

    .nav-links a:hover {
      background: rgba(148, 163, 184, 0.15);
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.375rem;
      background: rgba(239, 68, 68, 0.8);
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .logout-btn:hover {
      background: rgba(220, 38, 38, 1);
    }
  `],
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.user;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly isLoading = this.authService.isLoading;

  constructor() {
    effect(() => {
      if (!this.authService.isLoading()) {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
