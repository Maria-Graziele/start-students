import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlunoService } from '../../services/aluno.service';
import { AlunosComponent } from './aluno-list';

describe('AlunosComponent', () => {
  let component: AlunosComponent;
  let fixture: ComponentFixture<AlunosComponent>;
  let alunoServiceSpy: jasmine.SpyObj<AlunoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAluno = {
    id: 1,
    nome: 'João',
    cpf: '123',
    email: 'teste@email.com',
    telefone: '999999999',
    status: 'Ativo',
    ativo: true
  } as any;

  const mockPaginaVazia = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    pageSize: 5,
    first: true,
    last: true,
    empty: true
  };

  beforeEach(() => {
    alunoServiceSpy = jasmine.createSpyObj('AlunoService', [
      'listarComPaginacao',
      'deletar',
      'atualizar'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    alunoServiceSpy.listarComPaginacao.and.returnValue(of(mockPaginaVazia));

    TestBed.configureTestingModule({
      declarations: [AlunosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlunosComponent);
    component = fixture.componentInstance;
  });

  it('deve carregar alunos no init', () => {
    alunoServiceSpy.listarComPaginacao.and.returnValue(of({
      content: [mockAluno],
      totalPages: 1,
      totalElements: 1,
      number: 0,
      pageSize: 5,
      first: true,
      last: true,
      empty: false
    }));

    component.ngOnInit();

    expect(component.alunos.length).toBe(1);
    expect(component.carregando).toBe(false);
  });

  it('deve tratar erro ao carregar alunos', () => {
    alunoServiceSpy.listarComPaginacao.and.returnValue(
      throwError({ status: 500 })
    );

    component.carregarAlunos();

    expect(component.erro).toContain('Erro ao carregar alunos');
  });

  it('deve navegar para detalhes', () => {
    component.verDetalhes(mockAluno);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alunos', 1]);
  });

  it('deve excluir aluno com sucesso', () => {
    component.alunoParaExcluir = mockAluno;
    alunoServiceSpy.deletar.and.returnValue(of());

    component.confirmarExclusao();

    expect(alunoServiceSpy.deletar).toHaveBeenCalledWith(1);
  });

  it('deve alternar status', () => {
    alunoServiceSpy.atualizar.and.returnValue(of(mockAluno));

    component.toggleStatus(mockAluno);

    expect(alunoServiceSpy.atualizar).toHaveBeenCalled();
  });
});
