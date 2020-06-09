import { Component, OnInit } from '@angular/core';
import { LocationService } from '../service/location.service';
import { NzModalService } from 'ng-zorro-antd';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  isVisible = false;
  isLoading = true;
  Id;
  dataSource = [];
  constructor(public commonService: CommonService,
              private locateSvc: LocationService,
              private modal: NzModalService) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Locate Manager', url: '' },
    ];
    commonService.title = 'Locate Manager';
  }

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    const data = await this.locateSvc.getAll();
    console.log(data)
    this.dataSource = data;
    this.isLoading = false;
  }

  Edit(data) {
    this.isVisible = true;

    this.Id = data.Id;
  }

  addData() {

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

  }

  showDeleteConfirm(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this type?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: async () => {
        this.isLoading = true;
        await this.locateSvc.deleteItem(id);
        this.loadData();
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }

}
