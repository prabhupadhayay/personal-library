import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _registerUrl = "http://localhost:8080/api/users/register";
   //private _loginUrl = "http://localhost:8080/api/users/login";
  //private _registerUrl = "/api/users/register";
  private _loginUrl = "/api/users/login";

  constructor(private http: HttpClient,
    private _router: Router,public jwtHelper: JwtHelperService) { }

    



    // registerUser(user) {
    //   return this.http.post<any>(this._registerUrl, user)
    // }
  
    loginUser(user) {
      return this.http.post<any>(this._loginUrl, user)
    }
  
    logoutUser() {
      localStorage.removeItem('token')
      this._router.navigate(['/login'])
    }
  
    getToken() {
      return localStorage.getItem('token')
    }
  
    loggedIn() {
      return !!localStorage.getItem('token')    
    //  const token = localStorage.getItem('token');    // Check whether the token is expired and return
    //  // true or false
    //  return !this.jwtHelper.isTokenExpired(token);
    }

    // public isAuthenticated(): boolean {
    //   const token = localStorage.getItem('token');
    //   // Check whether the token is expired and return
    //   // true or false
    //   return !this.jwtHelper.isTokenExpired(token);
    // }

}