import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/Common';
import { BaseService } from './common/base.service';

@Injectable({
  providedIn: 'root'
})
export class BusTypeService extends BaseService {

  constructor(public http: HttpClient) {
    super(`bus-type`, http);
  }
  getAll() {
    return this.http.get<any>(`${ApiUrl}/bus-type`).toPromise();
  }

  saveItem(data, Id?) {
    if (Id) {
      return this.http.put<any>(`${ApiUrl}/bus-type`, data, { params: { Id } }).toPromise();
    }
    return this.http.post<any>(`${ApiUrl}/bus-type`, data).toPromise();
  }

  deleteItem(Id) {
    return this.http.delete<any>(`${ApiUrl}/bus-type`, { params: { Id } }).toPromise();
  }
}
