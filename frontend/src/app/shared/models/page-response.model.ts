// Interface base para todas as entidades
export interface BaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Aluno extends BaseModel {
  nome: string;
  status: 'Ativo' | 'Inativo';
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  ativo: boolean;
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

export interface FormErrors {
  [key: string]: string;
}

export interface SearchFilters {
  search?: string;
  status?: 'Ativo' | 'Inativo';
  ativo?: boolean;
  [key: string]: any;
}
