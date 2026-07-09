import { Directive, HostListener, ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  constructor(
    private el:ElementRef,
    private renderer: Renderer2
  ) {
    console.log("highlight directive initaiated");
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(this.el.nativeElement,'backgroundColor', 'yellow');

  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeStyle(this.el.nativeElement,'backgroundColor');   
  }

}
