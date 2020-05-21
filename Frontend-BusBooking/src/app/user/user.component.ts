import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private commonService: CommonService) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'User Detail', url: '' }];
    commonService.title = 'User Detail';
  }

  ngOnInit(): void {
  }

}
// this.route.params.subscribe
// thiss.route.snapshot.get('id');
