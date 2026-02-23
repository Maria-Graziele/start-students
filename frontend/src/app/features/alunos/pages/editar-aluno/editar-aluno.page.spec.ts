import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAlunoPage } from './editar-aluno.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlunoService } from '../../services/aluno.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditarAlunoPage', () => {
  let component: EditarAlunoPage;
  let fixture: ComponentFixture<EditarAlunoPage>;
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
    alunoServiceSpy = jasmine.createSpyObj('AlunoService', [
      'buscarPorId',
      'atualizar'
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [EditarAlunoPage],
      schemas: [ NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAlunoPage);
    component = fixture.componentInstance;
  });

  it('deve carregar aluno pelo id', () => {
    alunoServiceSpy.buscarPorId.and.returnValue(of(mockAluno));

    component.ngOnInit();

    expect(alunoServiceSpy.buscarPorId).toHaveBeenCalledWith(1);
  });

  it('deve atualizar aluno com sucesso', () => {
    alunoServiceSpy.atualizar.and.returnValue(of(mockAluno));

    component.onAtualizar(mockAluno);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alunos']);
  });

  it('deve tratar erro 409', () => {
    alunoServiceSpy.atualizar.and.returnValue(
      throwError({ status: 409, error: { message: 'Duplicado' } })
    );

    component.onAtualizar(mockAluno);

    expect(component.errosBackend.geral).toBe('Duplicado');
  });
});
