import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
  standalone: true
})
export class CpfMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input')
onInput(): void {
  const input = this.el.nativeElement as HTMLInputElement;

  let value = input.value.replace(/\D/g, '');
  value = value.slice(0, 11);

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  }

  input.value = value;
}

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    // Se não tiver 11 dígitos, limpa o campo
    if (value.length > 0 && value.length < 11) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
  }
}
