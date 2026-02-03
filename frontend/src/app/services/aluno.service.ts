import { Injectable } from '@angular/core'; // Permite que esta classe seja "injetada" em outros lugares
import { HttpClient } from '@angular/common/http'; // Usado para fazer chamadas HTTP (GET, POST, PUT, DELETE) para a API
import { Observable } from 'rxjs'; // Tipo do RxJS que representa uma resposta assíncrona, chega no futuro

// Interface: define o "formato" que um Aluno deve ter.
// Isso ajuda o TypeScript a checar os campos durante o desenvolvimento.
export interface Aluno {
  id?: number;
  nome: string;
  status: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  ativo: boolean;
  foto?: string;
  urlFoto?: string;
}


// @Injectable: diz ao Angular que esta classe é um serviço que pode ser usado em outros lugares.
// providedIn: 'root' -> significa que o serviço é único (singleton) para toda a aplicação.

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/alunos';  // Endereço base da API de alunos

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Aluno[]> { // Lista todos os alunos cadastrados. Retorna: Observable<Aluno[]> -> uma lista de alunos.
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  ListarTodos(): Observable<Aluno[]> {
    return this.listarTodos();
  }

  buscarPorId(id: number): Observable<Aluno> { //Busca um aluno pelo ID.
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  criar(aluno: Aluno): Observable<Aluno> { //Cria um novo aluno. Envia o objeto aluno no corpo da requisição.
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  atualizar(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, aluno);
  }

  Atualizar(id: number, aluno: Aluno): Observable<Aluno> { //Atualiza um aluno existente (pelo ID). Normalmente enviamos o objeto completo do aluno atualizado.
    return this.atualizar(id, aluno);
  }

  deletar(id: number): Observable<void> { //Deleta um aluno pelo ID. Retorno sem conteúdo -> tipamos como Observable<void>
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
