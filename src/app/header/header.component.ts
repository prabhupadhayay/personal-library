import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = "";
  navbarOpen = false;
  
  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  public isCollapsed = true;
  
}
