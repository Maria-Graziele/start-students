import { AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';

export function noExtraSpacesValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const valor: string = control.value;

    // Remove espaços do início e fim
    const trimmed = valor.trim();

    // Verifica se ficou vazio após trim
    if (trimmed.length === 0) {
      return { onlySpaces: true };
    }

    // Verifica múltiplos espaços internos
    if (/\s{2,}/.test(trimmed)) {
      return { multipleSpaces: true };
    }

    return null;
  };
}
