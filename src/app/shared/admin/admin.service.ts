import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {User} from "./user";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedUser: User;
  user: User[];
  readonly baseurl = "http://localhost:8080/api/users";
  readonly baseurl1 = "localhost:8080/api/users/add";
  constructor(private http: HttpClient) { }

  postUser(userData: User) {
    return this.http.post(this.baseurl, userData);
    // .pipe(retry(2),catchError(this.handleError));
  }
  getUserList() {
    return this.http.get(this.baseurl);
    // .pipe(retry(2),catchError(this.handleError));
  }
 getUserbyId(_id: string){
   return this.http.get(this.baseurl + `/${_id}`);
 }

  putUser(userData: User) {
    return this.http.put(this.baseurl + `/${userData._id}`, userData);
    // .pipe(retry(2),catchError(this.handleError));
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseurl + `/${_id}`);
    // .pipe(retry(2),catchError(this.handleError));
  }
}
