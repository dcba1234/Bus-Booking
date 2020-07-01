
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SendRequestComponent } from './send-request/send-request.component';
import localeVi from '@angular/common/locales/vi';
import { RouteDetailComponent } from './bus-route/route-detail/route-detail.component';
import { TokenInterceptorService } from './interceptor';
import { MyrequestComponent } from './myrequest/myrequest.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { RequestManagerComponent } from './request-manager/request-manager.component';

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
    LocationComponent,
    SendRequestComponent,
    RouteDetailComponent,
    MyrequestComponent,
    ClientPageComponent,
    RequestManagerComponent
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
    LeafletModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
