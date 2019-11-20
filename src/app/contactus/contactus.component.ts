import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ContactusService } from "../shared/contactus/contactus.service";

import { Contact } from "../shared/contactus/contact";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
//declare var M: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(public contactusService: ContactusService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.contactusService.selectedContact = {
      
      name: "",
      email: "",
      subject:""
        };
  }
  onSubmit(form: NgForm) {
      this.contactusService.postContact(form.value).subscribe(res => {
        this.resetForm(form);
        alert("thanks for contacting us")
        // var toastHTML = '<span style="color:black">Thanks For Contacting us!</span>';
        // M.toast({ html: toastHTML });
       
      });
    }

}
