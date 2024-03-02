import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {}

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('user-theme', theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = localStorage.getItem('user-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  loadTheme(): void {
    const userTheme = localStorage.getItem('user-theme') as 'light' | 'dark' | null;
    const themeToLoad = userTheme || 'light'; // default to 'light' if not set
    this.applyTheme(themeToLoad);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const body = document.body;
    body.classList.remove('light', 'dark'); // Remove any existing theme classes
    body.classList.add(theme); // Add the new theme class
  }
}

