import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  myInfo = {
    name: 'Tiến Thành'
  };
  routerTitle: RouterTitle[] = [];
  title = 'Title';
  constructor() {

  }
}

export interface RouterTitle {
  title: string;
  url: string;
}

