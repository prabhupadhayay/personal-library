import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth/auth.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { MustMatch } from '../_helpers/must-match.validator';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = { 
    membership:{
      
    }
  }
  //registerUserData.membership= {}
  isShow = true;
  
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
    
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
      },
      err => {console.log(err)
        alert(err.error)
      }
    )      
  }
  
  toggleDisplay() {
    this.isShow=false;
  }
  toggleDisplay1() {
    this.isShow=true;
  }
}
