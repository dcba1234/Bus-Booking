import { Router } from '@angular/router';
import { BusRouteService } from './../service/bus-route.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { CommonService } from '../service/common/common.service';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-bus-route',
  templateUrl: './bus-route.component.html',
  styleUrls: ['./bus-route.component.scss']
})
export class BusRouteComponent implements OnInit {
  searchValue = '';
  nameFiltervisible = false;
  isVisible = false;
  isLoading = true;
  Id;
  dataSource = [];
  dataDisplay = [];
  rfDriver: FormGroup;
  constructor(
    public commonService: CommonService,
    private routeSvc: BusRouteService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private route: Router
  ) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Route Manager', url: '' },
    ];
    commonService.title = 'Route Manager';
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
    const data = await this.routeSvc.getAll();
    this.dataSource = data;
    this.dataDisplay = [...data];
    this.isLoading = false;
  }

  Edit(data) {
    this.route.navigateByUrl(`/admin/route/${data.Id}`);
  }

  addData() {
    this.route.navigateByUrl(`/admin/route/create`);
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
        await this.routeSvc.saveItem(this.rfDriver.value, this.Id);
        this.isVisible = false;
        this.loadData();
      } catch (error) {
        console.log(error.error);
        this.isLoading = false;
        this.rfDriver.controls.Account.setErrors({ notUnique: true });
      }

    }
  }

  searchName() {
    console.log(this.dataSource);
    if (!this.searchValue.trim()) {
      this.dataDisplay = [...this.dataSource];
      return;
    }
    this.dataDisplay = this.dataSource.filter((i) => i.Name.indexOf(this.searchValue) > -1 );
  }

  resetsearchName() {
    this.searchValue = '';
  }

  showDeleteConfirm(id, status): void {
    this.modal.confirm({
      nzTitle: `Are you sure ${status === 1 ? 'Deactive' : 'Active'} this type?`,
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: async () => {
        this.isLoading = true;
        await this.routeSvc.changeStatusItem(id, status === 1 ? 'deactive' : 'active');
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
