import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { environmentLocal } from 'src/app/environments/environment';

const BASIC_URL = environmentLocal.apiUrl;
// const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userstorageService: UserStorageService
  ) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'sign-up', signupRequest);
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username,
      password,
    };

    return this.http
      .post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          const token = res.headers.get('Authorization')?.substring(7);
          const user = res.body;

          if (token || user) {
            this.userstorageService.saveToken(token);
            this.userstorageService.saveUser(user);
            return true;
          }
          return false;
        })
      );
  }

  getOrderByTrackingId(trackingId: any): Observable<any> {
    return this.http.get(BASIC_URL + `order/${trackingId}`);
  }
}
