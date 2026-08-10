import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private currentTheme = signal<Theme>(this.loadThemeFromStorage());

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem(this.THEME_KEY, theme);
    });
  }

  private loadThemeFromStorage(): Theme {
    const stored = localStorage.getItem(this.THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return 'light';
  }

  toggleTheme(): void {
    this.currentTheme.update(current => current === 'light' ? 'dark' : 'light');
  }

  getTheme(): Theme {
    return this.currentTheme();
  }
}