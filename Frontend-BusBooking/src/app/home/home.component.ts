
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfData = [];
  constructor(private router: Router, public commonService: CommonService, public userService: UserService) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'User List', url: '' }];
    commonService.title = 'User List';
    this.listOfData = userService.user;
    console.log(userService.user)
  }

  ngOnInit(): void {
    
  }
  navigateUser(id) {
    this.router.navigate(['/user', id]);
    console.log(id);

  }
}
