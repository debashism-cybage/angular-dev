import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly error = signal('');
  protected readonly emailSubmitting = signal(false);
  protected readonly googleSubmitting = signal(false);
  protected readonly users = signal([{ name: 'User 1', id: '1' }, { name: 'User 2', id: '2' }]);

  protected email = '';
  protected password = '';

  async signInWithGoogle(): Promise<void> {
    this.error.set('');
    this.googleSubmitting.set(true);
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(err.message || 'Google sign-in failed');
    } finally {
      this.googleSubmitting.set(false);
    }
  }

  async signInWithEmail(): Promise<void> {
    this.error.set('');
    if (!this.email ||!this.password) {
      this.error.set('Please enter both email and password');
      return;
    }
    this.emailSubmitting.set(true);
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(this.getErrorMessage(err.code));
    } finally {
      this.emailSubmitting.set(false);
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password';
      case 'auth/invalid-email':
        return 'Please enter a valid email';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      default:
        return 'Login failed. Please try again';
    }
  }
}