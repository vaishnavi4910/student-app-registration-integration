import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appAppnumbersOnly]'
})
export class AppnumbersOnly {

  constructor() { 
    console.log('Appnum only ')
  }
  @HostListener('keydown',['$event']) onKeyDown(event: KeyboardEvent){
    if(!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab'){
      event.preventDefault();
      
    }
  }


}
