import { DriverComponent } from './driver/driver.component';
import { BusComponentComponent } from './bus-component/bus-component.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { BusTypeComponent } from './bus-type/bus-type.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin', children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'bus', component: BusComponentComponent },
      { path: 'bus-type', component: BusTypeComponent },
      { path: 'driver', component: DriverComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
