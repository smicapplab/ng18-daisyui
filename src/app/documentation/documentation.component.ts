import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  standalone: true,
  imports: [CommonModule],
})

export class AppDocumentation {
  backgroundUrl = 'hero.jpg';
}
