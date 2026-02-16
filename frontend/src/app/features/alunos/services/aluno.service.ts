import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Aluno, PageResponse } from '../../../shared/models/aluno.model';

// Exportar tipos para outros componentes
export type { Aluno, PageResponse } from '../../../shared/models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/alunos';

  constructor(private http: HttpClient) {}

  // deve retornar PageResponse, não array
  listar(page: number = 0, size: number = 100): Observable<PageResponse<Aluno>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Aluno>>(this.apiUrl, { params });
  }

  listarComPaginacao(
    page: number = 0,
    size: number = 10,
    filtros?: { [key: string]: any }
  ): Observable<PageResponse<Aluno>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key] !== undefined && filtros[key] !== null && filtros[key] !== '') {
          params = params.set(key, filtros[key].toString());
        }
      });
    }

    return this.http.get<PageResponse<Aluno>>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  atualizar(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, aluno);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método específico para busca com filtro
  buscar(termoBusca: string, page: number = 0, size: number = 100): Observable<PageResponse<Aluno>> {
    return this.listarComPaginacao(page, size, { search: termoBusca });
  }

  buscarPorStatus(status: string, page: number = 0, size: number = 10): Observable<PageResponse<Aluno>> {
    return this.listarComPaginacao(page, size, { status });
  }

  buscarAtivos(ativo: boolean, page: number = 0, size: number = 10): Observable<PageResponse<Aluno>> {
    return this.listarComPaginacao(page, size, { ativo });
  }

  buscarComFiltros(
    page: number = 0,
    size: number = 10,
    search?: string,
    status?: string,
    ativo?: boolean
  ): Observable<PageResponse<Aluno>> {
    return this.listarComPaginacao(page, size, { search, status, ativo });
  }
}
