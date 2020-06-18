import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {

  constructor(public commonService: CommonService) { 
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Book Route Bus', url: '' },
    ];
    commonService.title = 'Book Route Bus';
  }

  ngOnInit(): void {
  }

}
