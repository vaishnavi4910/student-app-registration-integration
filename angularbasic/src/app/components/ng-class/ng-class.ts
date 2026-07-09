import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  imports: [CommonModule],
  templateUrl: './ng-class.html',
  styleUrl: './ng-class.css',
})
export class NgClass {
  divBgColor: string = "bg-success";
  isChecked: boolean= false

  addDiv1Color(className: string){
    this.divBgColor=className
  }
}


