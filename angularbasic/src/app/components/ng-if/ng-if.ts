import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ng-if',
  imports: [CommonModule,FormsModule],
  templateUrl: './ng-if.html',
  styleUrl: './ng-if.css',
})
export class NgIf {

  div1Visible: boolean= true;

  number1: string="";
  number2: string="";

  hideDiv1(){
    this.div1Visible=false;

  }
  showDiv1(){
    this.div1Visible=true;
  }

}
