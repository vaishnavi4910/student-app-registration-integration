import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../service/api';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {

  private api = inject(Api);

  userList: any[] = [];
  selectedUserId: number = 0;

  userObj: any = {
    userId: 0,
    emailId: '',
    password: '',
    fullName: '',
    mobileNo: ''
  };

  ngOnInit():void {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe((result: any) => {
      this.userList = result;
      console.log(" this.userList", this.userList);
      
    });
  }

  onSaveUser() {
    this.api.createUser(this.userObj).subscribe({
      next: () => {
        alert('User created successfully');
        this.getUsers();
        this.onReset();
      },
      error: (err) => {
        alert('User creation failed');
        console.log(err);
      }
    });
  }

//   onEdit(item: any) {

//   this.userObj = item;
//  }

  // onUpdateUser() {
  //   this.api.onUpdateUser(this.userObj).subscribe({
  //     next: (res) => {
  //       console.log("resres",res);
        
  //       alert('User updated successfully');
  //       this.getUsers();

  //     },
  //     error: (err:any) => {
  //       alert('User update failed');
  //       console.log(err);
  //     }
  //   });
  // }



  onEdit(item: any) {
  this.selectedUserId = item.userId;
  this.userObj = { ...item };
}

  onUpdateUser() {
  this.api.onUpdateUser(this.selectedUserId, this.userObj).subscribe({
    next: () => {
      alert('User updated successfully');
      this.getUsers();
      this.onReset();
    },
    error: (err) => {
      console.log(err);
      alert('User update failed');
    }
  });
}

  onDelete(userId: number) {
    this.api.onDeleteUser(userId ).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.getUsers();
      },
      error: (err:any) => {
        alert('User deletion failed');
        console.log(err);
      }
    });
  }

  onReset() {
    this.userObj = {
      userId: 0,
      emailId: '',
      password: '',
      fullName: '',
      mobileNo: ''
    };
  }

  
}