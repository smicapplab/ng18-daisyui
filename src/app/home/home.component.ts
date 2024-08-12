import { Component } from '@angular/core';
import { AppHero } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHero],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
