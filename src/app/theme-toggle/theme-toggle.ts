import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle-btn" (click)="themeService.toggle()" [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
      <span *ngIf="themeService.isDark()">&#9728;</span>
      <span *ngIf="!themeService.isDark()">&#9790;</span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      background: none;
      border: 1px solid currentColor;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.25rem;
      padding: 4px 10px;
      line-height: 1;
      color: inherit;
      transition: opacity 0.2s ease;
    }
    .theme-toggle-btn:hover {
      opacity: 0.7;
    }
  `]
})
export class ThemeToggleComponent {
  constructor(protected themeService: ThemeService) {}
}