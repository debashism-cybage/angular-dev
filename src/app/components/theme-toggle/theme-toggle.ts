import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      class="theme-toggle"
      role="switch"
      [attr.aria-checked]="themeService.isDarkMode()"
      aria-label="Toggle dark mode"
      (click)="onToggle()"
      [style.background-color]="themeService.isDarkMode() ? '#4a90e2' : '#ccc'"
    >
      <span
        class="theme-toggle__knob"
        [style.transform]="themeService.isDarkMode() ? 'translateX(24px)' : 'translateX(2px)'"
      ></span>
      <span class="theme-toggle__icon">
        {{ themeService.isDarkMode() ? '🌙' : '☀️' }}
      </span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 56px;
      height: 28px;
      border-radius: 14px;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: background-color 0.3s ease;
      outline-offset: 2px;
    }

    .theme-toggle:focus-visible {
      outline: 2px solid #4a90e2;
    }

    .theme-toggle__knob {
      position: absolute;
      top: 2px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
    }

    .theme-toggle__icon {
      position: absolute;
      right: 4px;
      font-size: 14px;
      line-height: 1;
      pointer-events: none;
    }
  `]
})
export class ThemeToggle {
  protected themeService = inject(ThemeService);

  onToggle(): void {
    this.themeService.toggleTheme();
  }
}