import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoAlunoPage } from './novo-aluno.page';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlunoService } from '../../services/aluno.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NovoAlunoPage', () => {
  let component: NovoAlunoPage;
  let fixture: ComponentFixture<NovoAlunoPage>;
  let alunoServiceSpy: jasmine.SpyObj<AlunoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAluno = {
    id: 1,
    nome: 'João',
    cpf: '123',
    email: 'teste@email.com',
    telefone: '999999999'
  } as any;

  beforeEach(() => {
    alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['criar']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [NovoAlunoPage],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoAlunoPage);
    component = fixture.componentInstance;
  });

  it('deve criar aluno com sucesso', () => {
    alunoServiceSpy.criar.and.returnValue(of(mockAluno));

    component.onCriar(mockAluno);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alunos']);
  });

  it('deve tratar erro 400 com validação', () => {
    alunoServiceSpy.criar.and.returnValue(
      throwError({
        status: 400,
        error: { errors: { nome: 'Nome obrigatório' } }
      })
    );

    component.onCriar(mockAluno);

    expect(component.errosBackend.nome).toBe('Nome obrigatório');
  });
});
