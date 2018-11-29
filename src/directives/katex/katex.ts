import {Directive, ElementRef, Input} from '@angular/core';
import * as katex from "katex";
//import "_katex";
/**
 * Generated class for the KatexDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
 @Directive({
   selector: '[Katex]'
 })

export class KatexDirective {

  @Input('Katex') equation: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.equation= '\\text{' + this.equation + '}';
    katex.render(this.equation, this.el.nativeElement, {
      displayMode: true
    });
  }
}
