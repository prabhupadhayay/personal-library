import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //readonly baseurl="/api/users";

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File) {
    //const endpoint = 'http://localhost:8080/api/users/fileUpload';
    const endpoint = '/api/users/fileUpload';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    //formData.append('ImageCaption', caption);
    return this.http
      .post(endpoint, formData);
  }
}
