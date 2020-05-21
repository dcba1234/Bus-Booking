import { CommonService } from './common.service';

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
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './user.service';
import { BusComponentComponent } from './bus-component/bus-component.component';
import { BusTypeComponent } from './bus-type/bus-type.component';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDetailComponent,
    BusComponentComponent,
    BusTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NzBreadCrumbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }, CommonService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
