import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common/common.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  constructor(private router: Router, public commonService: CommonService, private authenSvc: AuthenticationService) {
    commonService.routerTitle = [
      { title: '', url: '' }
    ];
    commonService.title = 'Home';
  }

  ngOnInit(): void {

  }
  navigateUser(id) {
    this.router.navigate(['/user', id]);
    console.log(id);

  }
  signOut() {
    this.authenSvc.deleteToken();
    this.router.navigateByUrl('sign-in');
  }

}
