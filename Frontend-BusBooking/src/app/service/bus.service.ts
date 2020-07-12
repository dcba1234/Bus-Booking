import { BaseService } from './common/base.service';
import { ApiUrl } from './../../Common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusService extends BaseService {

  constructor(public http: HttpClient) {
    super('bus', http);
   }

  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/bus`).toPromise();
  }

  saveItem(data, Id): any {
    if (Id) {
      return this.http
        .put<any>(`${ApiUrl}/bus/${Id}`, data)
        .toPromise();
    }
    return this.http.post<any>(`${ApiUrl}/bus`, data).toPromise();
  }

  deleteItem(Id) {
    return this.http
    .delete<any>(`${ApiUrl}/bus/${Id}`)
    .toPromise();
  }
}
