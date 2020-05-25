import { BusTypeService } from './../service/bus-type.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-bus-type',
  templateUrl: './bus-type.component.html',
  styleUrls: ['./bus-type.component.scss']
})
export class BusTypeComponent implements OnInit {
  dataSource = [];
  typeId = null;
  isVisible = false;
  isLoading = true;
  rfBusType: FormGroup;
  constructor(private router: Router,
              public commonService: CommonService,
              public busTypeSvc: BusTypeService,
              private fb: FormBuilder,
              private modal: NzModalService) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'Bus Manager', url: '' }];
    commonService.title = 'Bus Manager';
    this.loadData();
    this.rfBusType = this.fb.group({
      Name: ['', [Validators.required]],
      SeatNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  async loadData() {
    const data = await this.busTypeSvc.getAll();
    this.dataSource = data;
    this.isLoading = false;
  }

  Edit(data) {
    this.isVisible = true;
    this.rfBusType.patchValue(data);
    this.typeId = data.Id;
  }

  addData() {
    this.rfBusType.reset();
    this.typeId = null;
    this.isVisible = true;
    // this.busTypeSvc.saveItem({ Name: 'test', SeatNumber: 200 });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  async submitForm() {

    for (const i of Object.keys(this.rfBusType.controls)) {
      this.rfBusType.controls[i].markAsDirty();
      this.rfBusType.controls[i].updateValueAndValidity();
    }

    if (this.rfBusType.valid) {
      this.isVisible = false;
      this.isLoading = true;
      await this.busTypeSvc.saveItem(this.rfBusType.value, this.typeId);
      this.loadData();
    }
  }

  showDeleteConfirm(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this type?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: async () => {
        this.isLoading = true;
        await this.busTypeSvc.deleteItem(id);
        this.loadData();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
