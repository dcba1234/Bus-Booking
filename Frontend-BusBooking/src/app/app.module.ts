
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusComponentComponent } from './bus-component/bus-component.component';
import { BusTypeComponent } from './bus-type/bus-type.component';
import { DriverComponent } from './driver/driver.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BusRouteComponent } from './bus-route/bus-route.component';
import { LocationComponent } from './location/location.component';
import { AgmCoreModule } from '@agm/core';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusComponentComponent,
    BusTypeComponent,
    DriverComponent,
    AuthenticationComponent,
    BusRouteComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NzBreadCrumbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFyIt14t7U7QrjC2gOZQ883t1zAS4K_SM',
      libraries: ['places', 'geometry']
  })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
