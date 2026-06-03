import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCopyright]',
})
export class CopyrightDirective {
  constructor(el: ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetElement: HTMLElement = el.nativeElement;
    targetElement.classList.add('copyright');
    targetElement.textContent = `Copyright © ${currentYear}. All rights reserved.`;
  }
}
