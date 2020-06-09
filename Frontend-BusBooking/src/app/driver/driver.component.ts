import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { DriverService } from './../service/driver.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common/common.service';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  isVisible = false;
  isLoading = true;
  Id;
  dataSource = [];
  rfDriver: FormGroup;
  constructor(
    public commonService: CommonService,
    private driverSvc: DriverService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Driver Manager', url: '' },
    ];
    commonService.title = 'Driver Manager';
    this.rfDriver = this.fb.group({
      Name: ['', [Validators.required]],
      Account: ['', [Validators.required]],
      BirthDay: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
    });
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
    this.isVisible = true;
    this.rfDriver.patchValue(data);
    this.Id = data.Id;
  }

  addData() {
    this.rfDriver.reset();
    this.Id = null;
    this.isVisible = true;
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
    const value = { ...this.rfDriver.value };
    value.BirthDay = new Date(value.BirthDay).toISOString();
    console.log(value);
    for (const i of Object.keys(this.rfDriver.controls)) {
      this.rfDriver.controls[i].markAsDirty();
      this.rfDriver.controls[i].updateValueAndValidity();
    }

    if (this.rfDriver.valid) {

      this.isLoading = true;
      try {
        await this.driverSvc.saveItem(this.rfDriver.value, this.Id);
        this.isVisible = false;
        this.loadData();
      } catch (error) {
        console.log(error.error);
        this.isLoading = false;
        this.rfDriver.controls.Account.setErrors({ notUnique: true });
      }

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
        await this.driverSvc.deleteItem(id);
        this.loadData();
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })


}
