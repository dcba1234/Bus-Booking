import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }
  getAll(): any {
    return this.http.get<any>(`${ApiUrl}/driver`).toPromise();
  }
}
