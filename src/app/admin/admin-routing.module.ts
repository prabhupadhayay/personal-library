import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import{LoginComponent} from "./login/login.component";
import { AuthGuard } from "../auth.guard";
import{RoleGuardService as RoleGuard} from "../role-guard.service"
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [RoleGuard],data:{ expectedRole: 'Admin'}},
 // { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
