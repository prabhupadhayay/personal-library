import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType , HttpEvent} from "@angular/common/http";
import { UploadService } from '../shared/upload/upload.service';
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";

//import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"]
})
export class LibraryComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];
  constructor(public fb: FormBuilder,
    public router: Router,
    public fileUploadService : UploadService) {
      this.form = this.fb.group({
        name: [''],
        avatar: [null]
      })
    }

  ngOnInit() {}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addUser(
      this.form.value.name,
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['catalogue'])
      }
    })
  }




  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview() {
  //   // Show preview
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = _event => {
  //     this.previewUrl = reader.result;
  //   };
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append("files", this.fileData);
  //   console.log(formData);
  //   this.fileUploadProgress = "0%";

  //   this.http
  //     .post("http://localhost:8080/api/users/fileUpload", formData, {
  //       reportProgress: true,
  //       observe: "events"
  //     })
  //     .subscribe(events => {
  //       if (events.type === HttpEventType.UploadProgress) {
  //         this.fileUploadProgress =
  //           Math.round((events.loaded / events.total) * 100) + "%";
  //         console.log(this.fileUploadProgress);
  //       } else if (events.type === HttpEventType.Response) {
  //         this.fileUploadProgress = "";
  //         console.log(events.body);
  //         alert("SUCCESS !!");
  //       }
  //     });
  // }
}
