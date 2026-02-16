//Interface base para todas as entidades
export interface BaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Aluno extends BaseModel {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula?: string;
  status?: 'Ativo' | 'Inativo';
  ativo?: boolean;
  foto?: string;
  urlFoto?: string;
}

//Interface de resposta paginada do backend
export interface PageResponse<T> {
  content: T[];
  number: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

//Interface para erros de formulário
export interface FormErrors {
  [key: string]: string;
}

//Interface para filtros de busca
export interface SearchFilters {
  search?: string;
  status?: 'Ativo' | 'Inativo';
  ativo?: boolean;
  [key: string]: any;
}
