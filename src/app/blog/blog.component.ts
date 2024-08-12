import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BrowserCheckService } from '../utils/browser-check.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  standalone: true,
  imports: [CommonModule],
  providers: [BlogService],
})
export class BlogComponent implements OnInit {
  blogs: {
    title: string;
    author: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[] = [];

  constructor(
    private blogService: BlogService,
    private browserCheckService: BrowserCheckService
  ) {}

  /**
   * Initializes the component by fetching blog data from the blog service.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.articles;
    });
  }

  /**
   * Handles the event when an image fails to load.
   *
   * @param {Event} event - The event object triggered when the image fails to load.
   * @return {void}
   */
  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'https://via.placeholder.com/400x200?text=No+Image';
  }

  /**
   * Handles the event when an image is loaded successfully.
   *
   * @param {Event} event - The event object triggered when the image is loaded.
   * @return {void}
   */
  onImageLoad(event: Event) {
    const element = event.target as HTMLImageElement;
    // Clear the timeout if the image loads successfully
    clearTimeout((element as any).timeoutId);
  }

  /**
   * Initializes the carousel component after the view has been initialized.
   *
   * Sets up event listeners for mouse down, mouse leave, mouse up, and mouse move events
   * to enable scrolling of the carousel.
   *
   * @return {void}
   */
  ngAfterViewInit() {
    if(this.browserCheckService.isBrowser()){
      const carousel = document.getElementById('carousel') as HTMLElement;
      const images = carousel.querySelectorAll('img');

      images.forEach((img) => {
        img.setAttribute('draggable', 'false');
      });

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

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }


}
