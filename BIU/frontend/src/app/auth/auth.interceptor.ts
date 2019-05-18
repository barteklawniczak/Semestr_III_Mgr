import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import 'rxjs/add/operator/do';
import {AuthService} from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.cookieService.get('access_token')) {
      const headers = new HttpHeaders({
        'x-access-token': this.cookieService.get('access_token')
      });
      authReq = req.clone({headers: headers});
    }
    return next.handle(authReq).do((event: any) => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      }
    );
  }
}
