import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button class="theme-toggle-btn" (click)="themeService.toggleTheme()">
      {{ themeService.isDarkMode() ? '☀️ Light' : '🌙 Dark' }}
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      padding: 8px 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s, color 0.2s;
    }
    .theme-toggle-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
}