import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload/upload.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers:[UploadService]
})
export class CatalogueComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;

  constructor(private imageService : UploadService) { }

  ngOnInit() {
  }


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image){
   this.imageService.postFile(this.fileToUpload).subscribe(
     data =>{
       console.log('done');
       //Caption.value = null;
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
     }
   );
  }

}
