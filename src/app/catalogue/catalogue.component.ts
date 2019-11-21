import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload/upload.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers:[UploadService]
})
export class CatalogueComponent implements OnInit {
  Users: any = [];

  constructor(  
    public fileUploadService : UploadService) 
    {
      this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    this.fileUploadService.getUsers().subscribe((res) => {
      this.Users = res['users'];
    })
  }

}
