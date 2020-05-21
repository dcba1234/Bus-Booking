import { BusComponentComponent } from './bus-component/bus-component.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { MyPreloadingStrategyService } from './my-preloading-strategy.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { BusTypeComponent } from './bus-type/bus-type.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', loadChildren: () => import('./user/user.module').then(m => m.UserModule), data: { preload: false } },
  { path: 'user-detail', component: UserDetailComponent },
  {
    path: 'admin', children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'bus', component: BusComponentComponent },
      { path: 'bus-type', component: BusTypeComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: MyPreloadingStrategyService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
