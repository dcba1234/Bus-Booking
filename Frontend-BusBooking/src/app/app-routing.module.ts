import { SendRequestComponent } from './send-request/send-request.component';
import { DriverComponent } from './driver/driver.component';
import { BusComponentComponent } from './bus-component/bus-component.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { BusTypeComponent } from './bus-type/bus-type.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenGuard } from './guard/authen.guard';
import { LocationComponent } from './location/location.component';


const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'admin', canActivate: [AuthenGuard], children: [
      {
        path: '', component: HomeComponent, children: [
          { path: 'home', component: SendRequestComponent },
          { path: 'bus', component: BusComponentComponent },
          { path: 'bus-type', component: BusTypeComponent },
          { path: 'driver', component: DriverComponent },
          { path: 'location', component: LocationComponent },
        ]
      },
    ]
  },
  { path: 'sign-in', canActivate: [AuthenGuard], component: AuthenticationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
