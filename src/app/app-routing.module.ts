import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { HomeComponent } from "./home/home.component";
import { FAQComponent } from "./faq/faq.component";
import { MembershipComponent } from "./membership/membership.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { LibraryComponent } from "./library/library.component";
//import { AdminLoginComponent } from "./Admin/admin-login/admin-login.component";
import { AuthGuard } from "./auth.guard";
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contactus", component: ContactusComponent },
  { path: "faq", component: FAQComponent },
  {
    path: "membership",
    canActivate: [AuthGuard],
    component: MembershipComponent
  },
  { path: "library", canActivate: [AuthGuard], component: LibraryComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  //{ path: "Admin/admin-login", component: AdminLoginComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
