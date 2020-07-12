import { BaseService } from './common/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService {
  constructor(public http: HttpClient) {
    super('locate', http);
  }
  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/locate`).toPromise();
  }
  getByName(name): any {
    return this.http.get<any>(`${ApiUrl}/locate`, { params: { name } }).toPromise();
  }
  saveItem(data, Id?): any {
    if (Id) {
      return this.http
        .put<any>(`${ApiUrl}/locate/${Id}`, data)
        .toPromise();
    }
    return this.http.post<any>(`${ApiUrl}/locate`, data).toPromise();
  }

  deleteItem(Id) {
    return this.http
      .delete<any>(`${ApiUrl}/locate/${Id}`)
      .toPromise();
  }
}
