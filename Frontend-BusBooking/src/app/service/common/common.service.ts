import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  routerTitle = [];
  isAuthen = new BehaviorSubject(true);
  isLoading = new BehaviorSubject(false);
  title = '';
  constructor() {
  }

  setLoading(state: boolean) {
    this.isLoading.next(state);
  }

}
