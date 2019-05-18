import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {UserLoggedModel} from '../models/UserLoggedModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _http: HttpClient, private cookieService: CookieService) { }

  obtainAccessToken(loginData) {
    console.log(loginData);
    const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });
    this._http.post('http://localhost:8080/api/authenticate', loginData).subscribe(
      (data) => {
        this.saveToken(data);
        this.getUser(loginData.username).subscribe(
          (response) => {
          this.setUser(response);
        }, (error) => {
          console.log(error);
        });
      },
      (err) => {
            alert('Invalid Credentials');
            console.log(err);
          });
      }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
  }

  checkCredentials(): boolean {
    return this.cookieService.check('access_token');
  }

  logout() {
    this.cookieService.delete('user');
    this.cookieService.delete('access_token');
    this._router.navigate(['/login']);
  }

  registration(registrationData): Observable<any> {
    return this._http.post('http://localhost:8080/api/register/', registrationData, {responseType: 'text'});
  }

  setUser(user: UserLoggedModel) {
    this.cookieService.set('user', JSON.stringify(user));
    this._router.navigate(['/map']);
  }

  getLoggedUser(): UserLoggedModel {
    return JSON.parse(this.cookieService.get('user'));
  }

  getUser(username: string): Observable<UserLoggedModel> {
    return this._http.get<UserLoggedModel>('http://localhost:8080/users/' + username);
  }
}
