import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { ModalModule } from './_modal';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MembershipComponent } from "./membership/membership.component";
import { AboutComponent } from "./about/about.component";
import { FAQComponent } from "./faq/faq.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LibraryComponent } from './library/library.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
//import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';

import { AuthGuard } from "./auth.guard";
import { MustMatchDirective } from "./_helpers/must-match.directive";
import { AuthService } from "./shared/auth/auth.service";
import { ContactusService } from "./shared/contactus/contactus.service";
import { UploadService } from "./shared/upload/upload.service";


@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,
    HomeComponent,
    MembershipComponent,
    AboutComponent,
    FAQComponent,
    ContactusComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    LibraryComponent,
    AdminComponent,
    CatalogueComponent,
    //AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule
  ],
  providers: [AuthService, AuthGuard,ContactusService,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {}
