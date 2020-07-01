import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  constructor(private http: HttpClient) {

  }
  getAll() {
    return this.http.get<any>(`${ApiUrl}/route`).toPromise();
  }

  getActiveRoute() {
    return this.http.get<any>(`${ApiUrl}/route/active`).toPromise();
  }

  getById(id) {
    return this.http.get<any>(`${ApiUrl}/route/${id}`).toPromise();
  }

  saveItem(data, Id?) {
    if (Id) {
      return this.http.put<any>(`${ApiUrl}/route/${Id}`, data).toPromise();
    }
    return this.http.post<any>(`${ApiUrl}/route`, data).toPromise();
  }

  changeStatusItem(Id, value: 'active' | 'deactive') {
    return this.http.delete<any>(`${ApiUrl}/route/${value}/${Id}`).toPromise();
  }

  sendRequest(data: {routeId: number, StartDate: string, ExpireDate: string}) {
    return this.http.post<any>(`${ApiUrl}/request`, data).toPromise();
  }

  approvalRequest(id) {
    return this.http.put<any>(`${ApiUrl}/request/accept/${id}`, {}).toPromise();
  }

  rejectRequest(id) {
    return this.http.put<any>(`${ApiUrl}/request/reject/${id}`, {}).toPromise();
  }

  getRequest() {
    return this.http.get<any>(`${ApiUrl}/request`).toPromise();
  }

}
