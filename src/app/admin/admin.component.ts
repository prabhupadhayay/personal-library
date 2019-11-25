import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Flag } from "./flag";
import { AdminService } from "../shared/admin/admin.service";
import { User } from "../shared/admin/user";
import { ModalService } from '../_modal';

declare const M: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {
 
  constructor(public adminService: AdminService,private modalService:ModalService) { }
  flag: Flag;
  ngOnInit() {
    this.resetForm();
    this.refreshUserList();
    this.flag = { flag: 1 };
  }
  isShow = true;
  status: any[] = ['Active', 'InActive'];
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.adminService.selectedUser = {
      _id:"",
      username:"",
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      status:"",
      membership:{
        membership_id:"",
        btc:"",
        xmr:"",
        trans_id:""
      }
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value._id);
    if (form.value._id == null) {
      this.adminService.postUser(form.value).subscribe(res => {
        this.resetForm(form);
        this.refreshUserList();
        var toastHTML = '<span style="color:black">Saved Successfuly</span>';
        M.toast({ html: toastHTML });
      });
    } else {
      this.adminService.putUser(form.value).subscribe(res => {
        this.resetForm(form);
        this.refreshUserList();
        //this.closeModal();
        var toastHTML = '<span style="color:black">Updated Successfuly</span>';
        M.toast({ html: toastHTML });
      });
    }
  }


  refreshUserList() {
    this.adminService.getUserList().subscribe(res => {
      this.adminService.user = res as User[];
    });
  }

// getMembership(){
//   this.adminService.getUserList().subscribe(res=> {
//     this.adminService
//   })
// }

  onEdit(rog: User) {
    //flag=true;
    this.adminService.selectedUser = rog;
  }

  onDelete(_id: string) {
    if(confirm("Are you sure to delete this record?")== true){
    this.adminService.deleteUser(_id).subscribe(res => {
      this.refreshUserList();
      this.resetForm();
      M.toast({ html: "deleted Successfully", classes: "rounded" });
    });
  }
}
  setFlag() {
    return (this.flag = { flag: 0 });
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

toggleDisplay() {
  this.isShow=false;
}
toggleDisplay1() {
  this.isShow=true;
}

}
