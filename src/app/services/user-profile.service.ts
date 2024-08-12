import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a random user from the API.
   *
   * @return {Observable<any>} An observable containing the random user data.
   */
  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
