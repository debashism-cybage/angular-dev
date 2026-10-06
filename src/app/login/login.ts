import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>

        @if (error()) {
          <div class="error-msg">{{ error() }}</div>
        }

        <form (ngSubmit)="signInWithEmail()" class="login-form">
          <div class="form-group">
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Email"
              autocomplete="email"
              [disabled]="emailSubmitting() || googleSubmitting()"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Password"
              autocomplete="current-password"
              [disabled]="emailSubmitting() || googleSubmitting()"
            />
          </div>
          <button type="submit" class="primary-btn" [disabled]="emailSubmitting() || googleSubmitting()">
            @if (emailSubmitting()) {
              <span class="spinner"></span>
              <span>Signing in...</span>
            } @else {
              <span>Sign In</span>
            }
          </button>
        </form>

        <div class="divider">
          <span>or</span>
        </div>

        <button
          class="google-btn"
          (click)="signInWithGoogle()"
          [disabled]="emailSubmitting() || googleSubmitting()"
        >
          @if (googleSubmitting()) {
            <span class="spinner google-spinner"></span>
          } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
            >
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
          }
          <span>Sign in with Google</span>
        </button>

        <p class="signup-link">
          Don't have an account? <a routerLink="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100dvh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .login-card {
      background: white;
      border-radius: 1rem;
      padding: 3rem 2.5rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .login-card h1 {
      margin: 0 0 0.5rem;
      font-size: 2rem;
      color: #1a1a2e;
      font-weight: 600;
    }

    .login-card > p {
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

    .login-form {
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

    .divider {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e5e7eb;
    }

    .divider span {
      padding: 0 1rem;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .google-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      border: 1px solid #dadce0;
      border-radius: 0.5rem;
      background: white;
      color: #3c4043;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s, box-shadow 0.2s;
      width: 100%;
      justify-content: center;
    }

    .google-btn:hover:not(:disabled) {
      background-color: #f8f9fa;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .google-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .google-btn svg {
      flex-shrink: 0;
    }

    .signup-link {
      margin-top: 1.5rem;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .signup-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .signup-link a:hover {
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

    .google-spinner {
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-top-color: #667eea;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
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