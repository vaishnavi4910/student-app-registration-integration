import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pipe-ex',
  imports: [UpperCasePipe,LowerCasePipe,TitleCasePipe,DatePipe,SlicePipe,JsonPipe,CurrencyPipe,PercentPipe,DecimalPipe],
  templateUrl: './pipe-ex.html',
  styleUrl: './pipe-ex.css',
})
export class PipeEx {
  courseName :string = "angular";
  courseDuration :string = "DURATION is 3 mONTH";
  currentDate: Date= new Date();

  rollNoList: number[] =[111,112,113,114,115,116,117];

  studentObj: any={
    name: 'AAA',
    mobile: '892244',
    address:{
      city: 'Pune',
      state: 'MH'
    }
  }
    courseFee: number = 25000;
    orderValue: number= 108.3687;
}
