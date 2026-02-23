import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlunoService } from '../../services/aluno.service';
import { DetalhesDoAlunoComponent } from './aluno-details';

describe('DetalhesDoAluno', () => {
  let component: DetalhesDoAlunoComponent;
  let fixture: ComponentFixture<DetalhesDoAlunoComponent>;
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
    alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['buscarPorId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [DetalhesDoAlunoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesDoAlunoComponent);
    component = fixture.componentInstance;
  });

  it('deve carregar aluno com id válido', () => {
    alunoServiceSpy.buscarPorId.and.returnValue(of(mockAluno));

    component.ngOnInit();

    expect(alunoServiceSpy.buscarPorId).toHaveBeenCalledWith(1);
    expect(component.aluno).toEqual(mockAluno);
    expect(component.carregando).toBe(false);
  });

  it('deve setar erro se ID inválido', async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [DetalhesDoAlunoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'abc' } }
          }
        }
      ]
    });

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(DetalhesDoAlunoComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.erro).toBe('ID inválido.');
  });

  it('deve tratar erro ao buscar aluno', () => {
    alunoServiceSpy.buscarPorId.and.returnValue(throwError({ status: 404 }));

    component.ngOnInit();

    expect(component.erro).toBe('Aluno não encontrado.');
    expect(component.carregando).toBe(false);
  });

  it('deve navegar para lista', () => {
    component.voltarParaLista();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alunos']);
  });
});
