import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [UserProfileService],
})

export class AppNavbar implements OnInit {
  user: any;
  currentTheme: string = 'light'; // Default theme

  title: string = 'Project Template';
  navigation: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  constructor(private userProfileService: UserProfileService) {}
  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {
      this.user = data.results[0];
    });

    if (this.isBrowser()) {
      this.detectSystemTheme();
      // Load the saved theme from localStorage, if available
      const savedTheme = this.isLocalStorageAvailable()
        ? localStorage.getItem('theme')
        : null;
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        this.setTheme(this.currentTheme);
      }
    }
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    if (this.isBrowser()) {
      document.documentElement.setAttribute('data-theme', theme);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('theme', theme);
      }
    }
  }

  /**
   * Detects the system theme based on the user's preferences.
   *
   * Checks if the user's system is set to a dark or light theme and updates the current theme accordingly.
   *
   * @return {void} No return value, updates the current theme internally.
   */
  detectSystemTheme(): void {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light';
    }
  }

  /**
   * Checks if local storage is available in the current environment.
   *
   * @return {boolean} True if local storage is available, false otherwise.
   */
  isLocalStorageAvailable(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if the current environment is a browser.
   *
   * @return {boolean} True if the environment is a browser, false otherwise.
   */
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
