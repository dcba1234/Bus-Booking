
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfData = [];
  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }
  navigateUser(id) {
    this.router.navigate(['/user', id]);
    console.log(id);

  }
}
