import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends BaseService {
  constructor(public http: HttpClient) {
    super('driver', http);
  }
  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/driver`).toPromise();
  }
  saveItem(data, Id): any {
    if (Id) {
      return this.http
        .put<any>(`${ApiUrl}/driver/${Id}`, data)
        .toPromise();
    }
    return this.http.post<any>(`${ApiUrl}/driver`, data).toPromise();
  }

  deleteItem(Id) {
    return this.http
    .delete<any>(`${ApiUrl}/driver/${Id}`)
    .toPromise();
  }
}
