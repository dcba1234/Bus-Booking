import { Component, OnInit } from '@angular/core';
import { BusRouteService } from '../service/bus-route.service';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-register-history',
  templateUrl: './register-history.component.html',
  styleUrls: ['./register-history.component.scss']
})
export class RegisterHistoryComponent implements OnInit {
  dataSource = [];
  isLoading = true;
  constructor(private routeSvc: BusRouteService, public commonService: CommonService) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'History Manager', url: '' },
    ];
    commonService.title = 'History Manager';
    this.loadData();
  }

  ngOnInit(): void {
  }

  async loadData() {
    this.dataSource = await this.routeSvc.getHistory();
    this.isLoading = false;
  }

}
