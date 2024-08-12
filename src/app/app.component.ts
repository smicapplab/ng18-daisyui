import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbar } from './navigation/navbar/navbar.component';
import { AppHero } from './hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppNavbar, AppHero],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {}
