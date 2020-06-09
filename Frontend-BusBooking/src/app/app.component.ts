
import { Component } from '@angular/core';
import { CommonService } from './service/common/common.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './service/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin = false;
  isLoading = false;
  constructor(public commonService: CommonService,
              private authenSvc: AuthenticationService, private router: Router) {
    commonService.title = 'Title';
    router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((val: any) => {

      if (val.url === '/sign-in') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
    this.commonService.isLoading.subscribe((state) => this.isLoading = state);
  }
  title = 'BusBooking';
  signOut() {
    this.authenSvc.deleteToken();
    this.router.navigateByUrl('sign-in');
  }
}
