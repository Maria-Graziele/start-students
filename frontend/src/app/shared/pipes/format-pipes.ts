import { Pipe, type PipeTransform } from '@angular/core';

// Pipe para formatar CPF
 //Uso no template: {{ aluno.cpf | cpf }}
 //Input: "12345678900" ou "123.456.789-00"  Output: "123.456.789-00"
@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');

    // Se não tiver 11 dígitos, retorna como está
    if (numbers.length !== 11) return value;

    // Formata: 000.000.000-00
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

//Pipe para formatar telefone. Uso no template: {{ aluno.telefone | phone }}
@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');

    // Se não tiver 10 ou 11 dígitos, retorna como está
    if (numbers.length < 10 || numbers.length > 11) return value;

    // Formata: (00) 00000-0000 ou (00) 0000-0000
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }
}
