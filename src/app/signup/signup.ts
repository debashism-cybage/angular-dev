import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly error = signal('');
  protected readonly submitting = signal(false);

  protected displayName = '';
  protected email = '';
  protected password = '';
  protected confirmPassword = '';

  async signUp(): Promise<void> {
    this.error.set('');

    if (!this.displayName || !this.email || !this.password || !this.confirmPassword) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }

    this.submitting.set(true);
    try {
      await this.authService.signUpWithEmail(this.email, this.password, this.displayName);
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(this.getErrorMessage(err.code));
    } finally {
      this.submitting.set(false);
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/invalid-email':
        return 'Please enter a valid email';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters';
      default:
        return 'Sign up failed. Please try again';
    }
  }
}
