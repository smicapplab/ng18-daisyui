import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';
  private cache$: Observable<any> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a random user from the API.
   *
   * @return {Observable<any>} An observable containing the random user data.
   */
  getBlogs(): Observable<any> {
    if (!this.cache$) {
      this.cache$ = this.http.get<any>(this.apiUrl).pipe(
        shareReplay(1), // Cache the response
        catchError(error => {
          this.cache$ = null; // Reset cache on error
          throw error;
        })
      );
    }
    console.log(this.cache$)
    return this.cache$;
  }
}
