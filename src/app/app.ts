import { Component, inject, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    @if (isAuthenticated()) {
      <button class="logout-btn" (click)="logout()">Logout</button>
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

    .logout-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
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
