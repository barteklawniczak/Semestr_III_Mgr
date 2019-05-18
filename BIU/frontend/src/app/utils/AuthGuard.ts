
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.checkCredentials()) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
