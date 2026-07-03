import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  constructor() {
    this.applySavedTheme();
  }

  private applySavedTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }
}