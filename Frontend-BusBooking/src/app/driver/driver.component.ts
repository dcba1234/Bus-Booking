import { FormGroup } from '@angular/forms';
import { DriverService } from './../service/driver.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  isVisible = false;
  isLoading = true;
  dataSource = [];
  rfDriver: FormGroup;
  constructor(public commonService: CommonService,private driverSvc: DriverService ) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'Driver Manager', url: '' }];
    commonService.title = 'Driver Manager';
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.driverSvc.getAll();
    this.dataSource = data;
    this.isLoading = false;
  }

  Edit(data) {
    // this.isVisible = true;
    // this.rfBusType.patchValue(data);
    // this.typeId = data.Id;
  }

  addData() {
    // this.rfBusType.reset();
    // this.typeId = null;
    // this.isVisible = true;
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

    // for (const i of Object.keys(this.rfBusType.controls)) {
    //   this.rfBusType.controls[i].markAsDirty();
    //   this.rfBusType.controls[i].updateValueAndValidity();
    // }

    // if (this.rfBusType.valid) {
    //   this.isVisible = false;
    //   this.isLoading = true;
    //   await this.busTypeSvc.saveItem(this.rfBusType.value, this.typeId);
    //   this.loadData();
    // }
  }

  showDeleteConfirm(id): void {
    // this.modal.confirm({
    //   nzTitle: 'Are you sure delete this type?',
    //   nzContent: '<b style="color: red;"></b>',
    //   nzOkText: 'Yes',
    //   nzOkType: 'danger',
    //   nzOnOk: async () => {
    //     this.isLoading = true;
    //     await this.busTypeSvc.deleteItem(id);
    //     this.loadData();
    //   },
    //   nzCancelText: 'No',
    //   nzOnCancel: () => console.log('Cancel')
    // });
  }

}
