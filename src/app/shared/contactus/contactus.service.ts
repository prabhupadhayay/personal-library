import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router'
import{Contact} from './contact';
@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  user: Contact[];
  selectedContact: Contact;
 // private Url = "http://localhost:8080/api/users/contact";
 
  private Url = "/api/users/contact";

  constructor(private http: HttpClient,private _router: Router) { }
  postContact(userData: Contact) {
   // this._router.navigate(['/home'])
    return this.http.post(this.Url, userData);
   
    // .pipe(retry(2),catchError(this.handleError));
  }

}
