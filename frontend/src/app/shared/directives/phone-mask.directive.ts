import { Directive, ElementRef, HostListener } from '@angular/core';

// Diretiva para aplicar máscara de telefone automaticamente
@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

 @HostListener('input')
onInput(): void {
  const input = this.el.nativeElement as HTMLInputElement;

  let value = input.value.replace(/\D/g, '');
  value = value.slice(0, 11);

  if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }

  input.value = value;
}

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    // Se não tiver 10 ou 11 dígitos, limpa o campo
    if (value.length > 0 && value.length < 10) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
  }
}
