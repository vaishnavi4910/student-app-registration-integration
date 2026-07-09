import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  imports: [CommonModule],
  templateUrl: './ng-for.html',
  styleUrl: './ng-for.css',
})
export class NgFor {
   cityList: string[] =["pune","nagpur","jaipur","mumbai","thane"]

   employeeArray: any[] = [
    {empdId:121, name:'AAA',city: 'Pune',contactNo:'99988998'},
    {empdId:122, name:'BB',city: 'nagpur',contactNo:'111111'},
    {empdId:123, name:'CC',city: 'jaipur',contactNo:'2222222'},
    {empdId:124, name:'DD',city: 'mumbai',contactNo:'3333333'},
    {empdId:125, name:'EE',city: 'thane',contactNo:'444444444'}

   ]
}
