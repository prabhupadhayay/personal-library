import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
//import { BrowserModule } from "@angular/platform-browser";
import { ModalModule } from '../_modal';
//import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";

import {AdminComponent} from './admin.component'
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {RoleGuardService as RoleGuard} from './shared/role-guard.service';
@NgModule({
  declarations: [AdminComponent, HeaderComponent,LoginComponent,DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule ,
    AdminRoutingModule,
    NgbCollapseModule,
    FormsModule,
    HttpClientModule,ModalModule,
  ],
  providers: [RoleGuard]
})
export class AdminModule { }
