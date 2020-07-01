import { Component, OnInit } from '@angular/core';
import { BusRouteService } from '../service/bus-route.service';
import { CommonService } from '../service/common/common.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrls: ['./request-manager.component.scss']
})
export class RequestManagerComponent implements OnInit {
  isLoading = true;
  dataSource = [];
  constructor(private routeSvc: BusRouteService, public commonService: CommonService, private modal: NzModalService) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Request', url: '' },
    ];
    commonService.title = 'Request Manager';
   }

  ngOnInit(): void {
    this.onLoad();
  }
  async onLoad() {
    this.isLoading = true;
    this.dataSource = await this.routeSvc.getRequest();
    this.isLoading = false;
  }
  apply(data) {
    this.showConfirm(true, data);
  }
  reject(data) {
    this.showConfirm(false, data);
  }

  showConfirm(apply: boolean, data): void {
    this.modal.confirm({
      nzTitle: `<i>Do you want to ${apply ? 'apply' : 'reject'} this request?</i>`,
      nzContent: '<b></b>',
      nzOnOk: async () => {
        this.isLoading = true;
        // tslint:disable-next-line:max-line-length
        if (apply) {
          await this.routeSvc.approvalRequest(data.Id).catch((reason) => {
            this.showAlert();
          });
        } else {
          await this.routeSvc.rejectRequest(data.Id);
        }
        this.onLoad();
      }
    });
  }

  showAlert(): void {
    this.modal.error({
      nzTitle: 'You get an error',
      nzContent: 'It seem to be full of people in this route, please choose another route'
    });
  }
}


