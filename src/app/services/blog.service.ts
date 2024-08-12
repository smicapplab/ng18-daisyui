import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, tap } from 'rxjs';
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
  private loading = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getBlogs(): Observable<any> {
    if (this.blogData() === null) {
      this.loading.set(true);
      return this.http.get<any>(this.apiUrl).pipe(
        tap((data) => this.blogData.set(data)),
        catchError((error) => {
          this.error.set(error);
          throw error;
        }),
        finalize(() => this.loading.set(false))
      );
    }
    return new Observable((observer) => {
      observer.next(this.blogData());
      observer.complete();
    });
  }

  blogs = computed(() => this.blogData());
  hasError = computed(() => this.error() !== null);
  isLoading = computed(() => this.loading());

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
