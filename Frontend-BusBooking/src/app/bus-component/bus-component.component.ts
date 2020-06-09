import { BusService } from './../service/bus.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { BusTypeService } from '../service/bus-type.service';
import { DriverService } from '../service/driver.service';

@Component({
  selector: 'app-bus-component',
  templateUrl: './bus-component.component.html',
  styleUrls: ['./bus-component.component.scss']
})
export class BusComponentComponent implements OnInit {
  dataSource = [];
  isVisible = false;
  isLoading = true;
  Id;
  rfBus: FormGroup;
  types: [];
  drivers: [];
  constructor(private router: Router, private modal: NzModalService, public commonService: CommonService,
              public busSvc: BusService, private fb: FormBuilder,
              private busTypeSvc: BusTypeService, private driverSvc: DriverService
              ) {
    commonService.routerTitle = [{ title: 'Home', url: '' }, { title: 'Bus Manager', url: '' }];
    commonService.title = 'Bus Manager';
    this.loadData();
    this.rfBus = this.fb.group({
      Number: ['', [Validators.required]],
      TypeId: [undefined, [Validators.required]],
      DriverId: ['', [Validators.required]],
    });


  }

  ngOnInit(): void {
  }
  navigateUser(id) {
    this.router.navigate(['/user', id]);
    console.log(id);

  }

  async loadData() {
    const data = await this.busSvc.getAll();
    this.types = await this.busTypeSvc.getAll();
    this.drivers = await this.driverSvc.getAll();
    console.log(data);
    this.dataSource = data;
  }

  Edit(data) {
    this.isVisible = true;
    this.rfBus.patchValue(data);
    console.log(data);
    this.Id = data.Id;
  }

  addData() {
    this.rfBus.reset();
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
    for (const i of Object.keys(this.rfBus.controls)) {
      this.rfBus.controls[i].markAsDirty();
      this.rfBus.controls[i].updateValueAndValidity();
    }

    if (this.rfBus.valid) {

      this.isLoading = true;
      try {
        await this.busSvc.saveItem(this.rfBus.value, this.Id);
        this.isVisible = false;
        this.loadData();
      } catch (error) {
        console.log(error.error);
        this.isLoading = false;
        this.rfBus.controls.Number.setErrors({ notUnique: true });
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
        await this.busSvc.deleteItem(id);
        this.loadData();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
