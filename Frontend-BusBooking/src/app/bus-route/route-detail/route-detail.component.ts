import { filter } from 'rxjs/operators';
import { LocationService } from './../../service/location.service';
import { BusService } from './../../service/bus.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { BusRouteService } from './../../service/bus-route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss']
})
export class RouteDetailComponent implements OnInit {
  currentData;
  rform: FormGroup;
  isLoading = false;
  busData = [];
  locateData = [];
  constructor(public commonService: CommonService,
              private activeRoute: ActivatedRoute,
              private busSvc: BusService,
              private locateSvc: LocationService,
              private router: Router,
              private busRouteSvc: BusRouteService, private fb: FormBuilder) {

    
    this.rform = this.fb.group({
      Name: ['', [Validators.required]],
      BusId: ['', [Validators.required]],
      FirstLocateId: ['', [Validators.required]],
      EndLocateId: ['', [Validators.required]],
      ParkingFee: [0, [Validators.required]],
      ParkingLot: ['', [Validators.required]],
      DepartureTime: [new Date(), [Validators.required]],
      ArriveTime: [new Date(), [Validators.required]],
      locates: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (param) => {
      this.busData = (await this.busSvc.getAll()).filter((item) => item.IsEnable !== 0);
      this.locateData = (await this.locateSvc.getAll()).filter((item) => item.IsEnable !== 0);
      if (param.id !== 'create') {
        this.currentData = await this.busRouteSvc.getById(param.id);
        this.commonService.title = 'Route Manager';
        this.commonService.routerTitle = [
          { title: 'Home', url: '' },
          { title: 'Router Manager', url: './route' },
          { title: 'Router Editor ', url: '' },
        ];
        this.currentData.DepartureTime = new Date(this.currentData.DepartureTime);
        this.currentData.ArriveTime = new Date(this.currentData.ArriveTime);
        this.currentData.locates.forEach(element => {
          this.addFieldValue(element);
        });
        delete this.currentData.locates;
        this.rform.patchValue(this.currentData);
        if (!this.currentData) {
          this.router.navigate(['../'], {relativeTo: this.activeRoute});
        }
      } else {
        this.commonService.title = 'Create Route';
        this.commonService.routerTitle = [
          { title: 'Home', url: '' },
          { title: 'Router Manager', url: './route' },
          { title: 'Create Router ', url: '' },
        ];
      }
    });
  }

  get locates(): FormArray {
    return this.rform.get('locates') as FormArray;
  }

  async submitForm() {
    for (const i of Object.keys(this.rform.controls)) {
      this.rform.controls[i].markAsDirty();
      this.rform.controls[i].updateValueAndValidity();
    }
    if (!this.rform.valid) { return; }

    const value = this.rform.value;
    this.rform.value.locates = this.rform.value.locates.filter((item) => item.locateId && item.ArriveTime);
    if (this.rform.value.locates) {
      this.rform.value.locates = this.rform.value.locates.sort((a, b) => {
        if (a.ArriveTime > b.ArriveTime) {
          return 1;
        } else if (a.ArriveTime < b.ArriveTime) {
          return -1;
        }
        return 0;
      }).map((item) => ({...item, ArriveTime: (item.ArriveTime as Date).toISOString()}));
    }

    //.map((item) => ({...item, ArriveTime: (item.ArriveTime as Date).toISOString()})
    value.ArriveTime = value.ArriveTime.toISOString();
    value.DepartureTime = value.DepartureTime.toISOString();
    this.isLoading = true;
    if (this.currentData && this.currentData.Id) {
      value.Id = this.currentData.Id;
    }
    await this.busRouteSvc.saveItem(value, value.Id);
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }


  removeField(index) {
    this.locates.removeAt(index);
  }

  addField() {
    this.locates.push(this.fb.group({ locateId: [''], ArriveTime: [new Date()] }));
  }
  addFieldValue(data) {
    this.locates.push(this.fb.group({ locateId: [data.locateId], ArriveTime: [new Date(data.ArriveTime)] }));
  }
}
