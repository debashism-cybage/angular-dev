import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      class="theme-toggle"
      [class.dark]="themeService.currentTheme() === 'dark'"
      (click)="themeService.toggleTheme()"
      [attr.aria-label]="themeService.currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      [attr.aria-pressed]="themeService.currentTheme() === 'dark'"
      type="button"
    >
      <span class="toggle-track" aria-hidden="true">
        <span class="toggle-thumb">
          @if (themeService.currentTheme() === 'dark') {
            <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
            </svg>
          } @else {
            <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          }
        </span>
      </span>
      <span class="sr-only">{{ themeService.currentTheme() === 'dark' ? 'Dark mode on' : 'Light mode on' }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      border-radius: 9999px;
      outline: none;
    }

    .theme-toggle:focus-visible {
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }

    .toggle-track {
      display: flex;
      align-items: center;
      width: 52px;
      height: 28px;
      background-color: #cbd5e0;
      border-radius: 9999px;
      padding: 2px;
      transition: background-color 0.3s ease;
      position: relative;
    }

    .theme-toggle.dark .toggle-track {
      background-color: #4a5568;
    }

    .toggle-thumb {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
      transform: translateX(0);
      color: #f6ad55;
    }

    .theme-toggle.dark .toggle-thumb {
      transform: translateX(24px);
      color: #667eea;
    }

    .icon {
      display: block;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);
}