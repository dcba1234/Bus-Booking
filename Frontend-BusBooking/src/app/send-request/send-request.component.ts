import { LocationService } from './../service/location.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common/common.service';
import { BusRouteService } from '../service/bus-route.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {
  isLoading = true;
  dataSource = [];
  dataDisplay = [];
  locates = [];
  rform: FormGroup;
  constructor(public commonService: CommonService,
              private routeSvc: BusRouteService,
              private fb: FormBuilder,
              private locateSvc: LocationService,
              private modal: NzModalService,
              private route: Router) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Book Route Bus', url: '' },
    ];
    commonService.title = 'Book Route Bus';
    this.rform = this.fb.group({
      name: [''],
      locateId: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.routeSvc.getActiveRoute();
    this.dataSource = data;
    this.locates = await this.locateSvc.getAll();
    this.isLoading = false;
    console.log(this.locates);
  }
  register(data) {
    this.showConfirm(data);
  }

  async submitForm() {
    for (const i of Object.keys(this.rform.controls)) {
      this.rform.controls[i].markAsDirty();
      this.rform.controls[i].updateValueAndValidity();
    }
    if (!this.rform.valid) { return; }
    const value = this.rform.value;
    this.dataDisplay = this.dataSource.filter((i) => i.Name.indexOf(value.name) > -1 && i.FirstLocateId === value.locateId);

  }

  showConfirm(data): void {
    const submitVal = this.rform.value;
    this.modal.confirm({
      nzTitle: '<i>Do you want to send request?</i>',
      nzContent: '<b></b>',
      nzOnOk: async () => {
        // tslint:disable-next-line:max-line-length
        await this.routeSvc.sendRequest({routeId: data.Id, ExpireDate: (submitVal.date[1] as Date).toISOString(), StartDate: (submitVal.date[0] as Date).toISOString()});
        this.route.navigateByUrl('/client/my-request');
      }
    });
  }
}
