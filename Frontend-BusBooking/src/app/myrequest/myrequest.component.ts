import { AuthenticationService } from './../service/authentication.service';
import { BusRouteService } from './../service/bus-route.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.component.html',
  styleUrls: ['./myrequest.component.scss']
})
export class MyrequestComponent implements OnInit {
  isLoading = true;
  dataSource = [];
  currentUser: {
    Account: string;
    Name: string;
    BirthDay: Date;
    Gender: string;
    PhoneNumber: string;
    RouteResgisterId: number
  };
  currentRoute: {
    Id: number;
    RequesterId: number;
    Name: string;
    requesterName: string;
    Account: string;
    RequestDate: Date;
    StartDate: Date;
    ExpireDate: Date;
    Status: string;
    routeId: number;
  };
  constructor(private routeSvc: BusRouteService, public commonService: CommonService, private auth: AuthenticationService) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'My Request', url: '' },
    ];
    commonService.title = 'My Request';
  }

  ngOnInit(): void {
    this.onLoad();
  }
  async onLoad() {
    this.isLoading = true;
    this.dataSource = await this.routeSvc.getRequest();
    this.currentUser = await this.auth.getCurrentUser();
    console.log(this.currentUser);
    this.currentRoute = this.dataSource.find((i) => i.Id = this.currentUser.RouteResgisterId);
    console.log(this.currentRoute);

    this.isLoading = false;
  }
}
