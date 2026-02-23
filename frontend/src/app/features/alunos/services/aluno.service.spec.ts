import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlunoService } from './aluno.service';
import { Aluno } from '../../../shared/models/aluno.model';

describe('AlunoService', () => {

  let service: AlunoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/alunos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlunoService]
    });

    service = TestBed.get(AlunoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve listar alunos', () => {
    const mockResponse = {
      content: [],
      totalPages: 1,
      totalElements: 0,
      number: 0
    };

    service.listar().subscribe(response => {
      expect(response.totalPages).toBe(1);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'GET' && req.url === apiUrl
    );

    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('100');

    req.flush(mockResponse);
  });

  it('deve buscar aluno por id', () => {
    const mockAluno: Aluno = {
      id: 1,
      nome: 'Maria Silva',
      cpf: '123',
      email: 'maria@email.com',
      telefone: '9999',
      matricula: '2023',
      status: 'Ativo',
      ativo: true,
      foto: null
    };

    service.buscarPorId(1).subscribe(aluno => {
      expect(aluno.id).toBe(1);
      expect(aluno.nome).toBe('Maria Silva');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockAluno);
  });

  it('deve criar aluno', () => {
    const mockAluno: Aluno = {
      nome: 'Novo',
      cpf: '123',
      email: 'novo@email.com',
      telefone: '9999',
      matricula: '',
      status: 'Ativo',
      ativo: true,
      foto: null
    };

    service.criar(mockAluno).subscribe(aluno => {
      expect(aluno.nome).toBe('Novo');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    req.flush(mockAluno);
  });

});
