import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from './service/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthenticationService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    const tokenRs = jwt_decode(token);
    if (tokenRs.data.isManager === 1) {
      return true;
    } else {
      return this.router.parseUrl('client/home');
    }
  }
}
