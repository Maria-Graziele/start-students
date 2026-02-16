import { AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';

export function nomeCompletoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return { nomeInvalido: 'Nome é obrigatório' };
    }

    // Remove caracteres invisíveis e normaliza espaços
    const valorLimpo = control.value
      .replace(/[\u200B-\u200D\uFEFF\u3164]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!valorLimpo) {
      return { nomeInvalido: 'Nome não pode estar vazio' };
    }

    // Apenas letras e espaços
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valorLimpo)) {
      return { nomeInvalido: 'Nome não pode conter números ou caracteres especiais' };
    }

    const palavras = valorLimpo.split(' ');

    if (palavras.length < 2) {
      return { nomeInvalido: 'Nome completo deve conter nome e sobrenome' };
    }

    for (let palavra of palavras) {
      if (palavra.length < 2) {
        return { nomeInvalido: 'Cada parte do nome deve ter pelo menos 2 caracteres' };
      }
    }

    return null;
  };
}
