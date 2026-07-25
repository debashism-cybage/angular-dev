import { Component, inject, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.user;
  protected readonly isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/']);
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
