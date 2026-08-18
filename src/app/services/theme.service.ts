import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme_preference';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject: BehaviorSubject<Theme>;
  isDarkMode: Observable<boolean>;

  constructor() {
    const savedTheme = this.getSavedTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);
    this.isDarkMode = new Observable<boolean>(observer => {
      this.themeSubject.subscribe(theme => observer.next(theme === 'dark'));
    });
    this.applyTheme(savedTheme);
  }

  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved as Theme;
    }
    return 'light';
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  toggleTheme(): void {
    const current = this.themeSubject.getValue();
    const next: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  getTheme(): Theme {
    return this.themeSubject.getValue();
  }
}