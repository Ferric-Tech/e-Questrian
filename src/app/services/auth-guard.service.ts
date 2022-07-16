import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<boolean> | Promise<boolean> | boolean> {
    console.log('1');
    if (await this.authService.isAuthenticated()) {
      console.log('True');
      return true;
    }
    console.log('False');
    this.router.navigate(['signin']);
    return false;
  }
}
