import { Component } from '@angular/core';
import { AppHero } from '../hero/hero.component';
import { BrowserCheckService } from '../utils/browser-check.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHero],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(private browserCheckService: BrowserCheckService) { }

  carouselImages: string[] = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
    'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
    'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
    'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp',
    'https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp',
  ];

  ngAfterViewInit() {
    if( this.browserCheckService.isBrowser() ) {
      const carousel = document.getElementById('carousel') as HTMLElement;
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
      });

      carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
      });

      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // The higher the value, the faster the scrolling
        carousel.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
