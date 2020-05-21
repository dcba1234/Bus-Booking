import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root'
})
export class BusTypeService {

  constructor(private http: HttpClient) {

  }
  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/bus-type`).toPromise();
  }

  saveItem(data) {
    return this.http.post<any>(`${ApiUrl}/bus-type`, data).toPromise();
  }

  deleteItem(Id) {
    return this.http.delete<any>(`${ApiUrl}/bus-type`, { params: { Id } }).toPromise();
  }
}
