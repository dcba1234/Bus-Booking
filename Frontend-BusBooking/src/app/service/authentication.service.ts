import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/Common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userInfo: BehaviorSubject<{name: string}> = new BehaviorSubject({name: ''});
  constructor(private http: HttpClient) { }
  login(user) {
    return this.http.post<any>(`${ApiUrl}/login`, user).toPromise();
  }
  saveToStorage(jwt: string) {
    localStorage.setItem('token', jwt);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    return localStorage.removeItem('token');
  }
  setName(name) {
    this.userInfo.next({name});
  }

  getCurrentUser() {
    return this.http.get<any>(`${ApiUrl}/user`).toPromise();
  }
}
