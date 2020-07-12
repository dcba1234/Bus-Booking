import { Router } from '@angular/router';
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
  displayData = [];
  selectedValue = 'all';
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  numberOfChecked = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  constructor(private routeSvc: BusRouteService,
              public commonService: CommonService,
              private modal: NzModalService,
              private router: Router) {
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
    this.displayData = [...this.dataSource];
    this.isLoading = false;
  }
  apply(data) {
    this.showConfirm(true, data);
  }
  reject(data) {
    this.showConfirm(false, data);
  }

  refreshStatus() {
    this.numberOfChecked = this.displayData.filter(item => this.mapOfCheckedId[item.Id]);
  }

  checkAll(value: boolean): void {
    this.displayData.filter(item => item.Status === 'pending').forEach(item => (this.mapOfCheckedId[item.Id] = value));
    this.refreshStatus();
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

  statusChange(event) {
    console.log(event);
    if (event === 'all') {
      this.displayData = [...this.dataSource];
      return;
    }
    this.displayData = this.dataSource.filter((item) => item.Status === event);
  }

  routeView(id) {
    console.log(id);
    this.router.navigateByUrl(`/admin/route/${id}`);
  }

  showAlert(): void {
    this.modal.error({
      nzTitle: 'You get an error',
      nzContent: 'It seem to be full of people in this route, please choose another route'
    });
  }
}


