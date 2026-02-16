//Arquivo responsável por centralizar funções utilitárias relacionadas à manipulação de texto.
//Remove espaços no início e no fim e substitui múltiplos espaços internos por apenas um.
export function normalizeSpaces(value: string | null | undefined): string {

  // Se o valor for null ou undefined, retorna string vazia
  if (!value) {
    return '';
  }

  return value
    .trim()           // remove espaços no início e no fim
    .replace(/\s+/g, ' '); // substitui múltiplos espaços por apenas um
}


// Verifica se a string possui apenas espaços.
export function isOnlySpaces(value: string | null | undefined): boolean {

  if (!value) {
    return true;
  }

  return value.trim().length === 0;
}


// Capitaliza a primeira letra de cada palavra.
export function capitalizeWords(value: string | null | undefined): string {

  if (!value) {
    return '';
  }

  return normalizeSpaces(value)
    .toLowerCase()
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}
