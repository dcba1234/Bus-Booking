
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common/common.service';
import { AuthenticationService } from '../service/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfData = [];
  userInfo = '';
  constructor(private router: Router, public commonService: CommonService, private authenSvc: AuthenticationService) {
    commonService.routerTitle = [
      { title: '', url: '' }
    ];
    commonService.title = 'Home';
    console.log(this.authenSvc.userInfo);
    
    this.authenSvc.userInfo.subscribe((user) => {
      this.userInfo = user.name;
    });
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
