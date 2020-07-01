import { PermissionGuard } from './permission.guard';
import { RequestManagerComponent } from './request-manager/request-manager.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { MyrequestComponent } from './myrequest/myrequest.component';
import { RouteDetailComponent } from './bus-route/route-detail/route-detail.component';
import { BusRouteComponent } from './bus-route/bus-route.component';
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
    path: 'admin', canActivate: [AuthenGuard, PermissionGuard], children: [
      {
        path: '', component: HomeComponent, children: [
          { path: 'bus', component: BusComponentComponent },
          { path: 'bus-type', component: BusTypeComponent },
          { path: 'driver', component: DriverComponent },
          { path: 'location', component: LocationComponent },
          { path: 'route', component: BusRouteComponent },
          { path: 'route/:id', component: RouteDetailComponent },
          { path: 'route/create', component: RouteDetailComponent },
          { path: 'home', component: RequestManagerComponent },
        ]
      },
    ]
  },
  { path: 'sign-in', canActivate: [AuthenGuard], component: AuthenticationComponent },
  {
    path: 'client', canActivate: [AuthenGuard], children: [
      {
        path: '', component: ClientPageComponent, children: [
          { path: 'home', component: SendRequestComponent },
          { path: 'my-request', component: MyrequestComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
