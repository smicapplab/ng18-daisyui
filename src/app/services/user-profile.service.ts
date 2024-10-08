import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'https://randomuser.me/api/';
  private cache$: Observable<any> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a random user from the API.
   *
   * @return {Observable<any>} An observable containing the random user data.
   */
  getUserProfile(): Observable<any> {
    if (!this.cache$) {
      this.cache$ = this.http.get<any>(this.apiUrl).pipe(
        shareReplay(1), // Cache the response
        catchError(error => {
          this.cache$ = null; // Reset cache on error
          throw error;
        })
      );
    }
    return this.cache$;
  }
}
