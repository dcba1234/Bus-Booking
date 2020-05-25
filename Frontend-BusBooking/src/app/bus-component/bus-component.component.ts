import { BusService } from './../service/bus.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-bus-component',
  templateUrl: './bus-component.component.html',
  styleUrls: ['./bus-component.component.scss']
})
export class BusComponentComponent implements OnInit {
  dataSource = [];
  constructor(private router: Router, public commonService: CommonService, public busSvc: BusService) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'Bus Manager', url: '' }];
    commonService.title = 'Bus Manager';
    this.loadData();
  }

  ngOnInit(): void {
  }
  navigateUser(id) {
    this.router.navigate(['/user', id]);
    console.log(id);

  }

  async loadData() {
    const data = await this.busSvc.getAll();
    console.log(data)
    this.dataSource = data;
  }
}
