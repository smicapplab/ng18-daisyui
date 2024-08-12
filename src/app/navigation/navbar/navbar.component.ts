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

    // Check if localStorage is available
    if (this.isLocalStorageAvailable()) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        this.setTheme(this.currentTheme);
      }
    } else {
      this.setTheme(this.currentTheme);
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
      localStorage.setItem('theme', theme);
    }
  }

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

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
