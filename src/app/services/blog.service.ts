import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl =
    'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';
  private blogData = signal<any>(null);
  private error = signal<any>(null);

  // Not used in this example since SSR but can be used to show loading state
  private loading = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getBlogs(forceReload: boolean = false) {
    if (this.blogData() !== null && !forceReload) {
      return of(this.blogData());
    }

    this.loading.set(true);
    this.error.set(null);

    let request = this.http.get<any>(this.apiUrl);

    // simulate delay to show skeleton
    if (forceReload) {
      request = request.pipe(delay(2000)); // Add delay only when forceReload is true
    }

    return request
      .pipe(
        tap((data) => this.blogData.set(data)),
        catchError((error) => {
          this.error.set(error);
          throw error;
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((data) => {
        this.blogData.set(data);
      });
  }

  blogs = computed(() => this.blogData());
  hasError = computed(() => this.error() !== null);
  isLoading = computed(() => this.loading());

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
