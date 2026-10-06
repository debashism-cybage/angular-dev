import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="signup-container">
      <div class="signup-card">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        @if (error()) {
          <div class="error-msg">{{ error() }}</div>
        }

        <form (ngSubmit)="signUp()" class="signup-form">
          <div class="form-group">
            <input
              type="text"
              [(ngModel)]="displayName"
              name="displayName"
              placeholder="Full Name"
              autocomplete="name"
              [disabled]="submitting()"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Email"
              autocomplete="email"
              [disabled]="submitting()"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Password"
              autocomplete="new-password"
              [disabled]="submitting()"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              autocomplete="new-password"
              [disabled]="submitting()"
            />
          </div>
          <button type="submit" class="primary-btn" [disabled]="submitting()">
            @if (submitting()) {
              <span class="spinner"></span>
              <span>Creating account...</span>
            } @else {
              <span>Sign Up</span>
            }
          </button>
        </form>

        <p class="login-link">
          Already have an account? <a routerLink="/login">Sign In</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .signup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100dvh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .signup-card {
      background: white;
      border-radius: 1rem;
      padding: 3rem 2.5rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .signup-card h1 {
      margin: 0 0 0.5rem;
      font-size: 2rem;
      color: #1a1a2e;
      font-weight: 600;
    }

    .signup-card > p {
      margin: 0 0 2rem;
      color: #6b7280;
      font-size: 1rem;
    }

    .error-msg {
      background: #fef2f2;
      color: #dc2626;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .signup-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-group input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-group input:disabled {
      background: #f9fafb;
      opacity: 0.7;
    }

    .primary-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .primary-btn:hover:not(:disabled) {
      opacity: 0.9;
    }

    .primary-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-link {
      margin-top: 1.5rem;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
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
