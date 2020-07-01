import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthenticationService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (next.routeConfig.path === 'sign-in') {
      if (token) {
        const tokenRs = jwt_decode(token);
        this.authSvc.setName(tokenRs.data.name);
        return this.router.parseUrl('admin/driver');
      }
      return true;
    }

    if (token) {
      const tokenRs = jwt_decode(token);
      this.authSvc.setName(tokenRs.data.name);
      return true;
    }
    return this.router.parseUrl('sign-in');



  }

}
