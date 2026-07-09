import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-api',
  imports: [],
  templateUrl: './get-api.html',
  styleUrl: './get-api.css',
})
export class GetApi implements OnInit {
  http=inject(HttpClient);
  userList: any[] = [];
  todoList: any[] = [];
  busUserList:any[]=[];
  roboticsInfoList: any[] =[];

   
  ngOnInit():void{
    debugger;
    this.getUsers();
    this.getTodoItems();
    this.getAllBusBookingUsers();
    this.getRoboticsInfo()
  }

  getUsers(){
    debugger;
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result :any)=>{
      debugger;
      this.userList=result;

    })
  }

  getTodoItems(){
    this.http.get("https://jsonplaceholder.typicode.com/todos").subscribe((result2 :any)=>{
      debugger;
      this.todoList=result2;
    })
  }
getAllBusBookingUsers(){
  this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetAllUsers").subscribe((result3: any) => {
    debugger;
    this.busUserList = result3.data;
  })
}

getRoboticsInfo(){
  this.http.get("http://172.17.12.62:8082/reborn/api/lk-codes/ROBOTICS").subscribe((result4: any) =>{
    debugger;
    this.roboticsInfoList = result4;
  })
}

}
