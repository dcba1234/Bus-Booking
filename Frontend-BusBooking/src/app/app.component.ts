import { CommonService } from './common.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public commonService: CommonService) {
    commonService.title = 'Title';
  }
  title = 'BusBooking';
}
