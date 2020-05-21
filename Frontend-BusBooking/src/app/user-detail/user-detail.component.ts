import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private commonService: CommonService) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'User Detail', url: '' }];
    commonService.title = 'User Detail ( component )';
  }

  ngOnInit(): void {
  }

}
