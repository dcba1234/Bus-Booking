import { ApiUrl } from './../../Common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/bus`).toPromise();
  }
}
