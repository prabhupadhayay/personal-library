import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Upload } from './upload';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //baseURL ="/api/users";
  baseURL = "http://localhost:8080/api/users";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  percentDone: any = 0;
  constructor(private http: HttpClient) { }
  
  
  getUsers() {
    return this.http.get(this.baseURL)
  }

  // Create User
  addUser(name: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("avatar", profileImage);

    return this.http.post<Upload>(`${this.baseURL}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
 
errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
