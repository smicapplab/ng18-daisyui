import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

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

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.articles;
    });
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'https://via.placeholder.com/400x200?text=No+Image';
  }

  onImageLoad(event: Event) {
    const element = event.target as HTMLImageElement;
    // Clear the timeout if the image loads successfully
    clearTimeout((element as any).timeoutId);
  }

  ngAfterViewInit() {
    // This function can be used to set the timeout for each image
    const images = document.querySelectorAll('img');
    images.forEach((img: any) => {
      img.timeoutId = setTimeout(() => {
        this.onImageError({ target: img } as Event);
      }, 2000); // 2 seconds timeout
    });
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
