import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (next.routeConfig.path === 'sign-in') {
      if (localStorage.getItem('token')) {
        return this.router.parseUrl('admin/driver');
      }
      return true;
    }

    if (localStorage.getItem('token')) {
      return true;
    }
    return this.router.parseUrl('sign-in');



  }

}
