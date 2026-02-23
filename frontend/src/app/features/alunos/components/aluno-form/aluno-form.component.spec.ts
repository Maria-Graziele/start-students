import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AlunoFormComponent } from './aluno-form';
import { PhotoUploadComponent } from 'src/app/shared/components/photo-upload/photo-upload';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AlunoFormComponent', () => {

  let component: AlunoFormComponent;
  let fixture: ComponentFixture<AlunoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunoFormComponent, PhotoUploadComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o formulário', () => {
    expect(component).toBeTruthy();
    expect(component.alunoForm).toBeDefined();
  });

  it('formulário inválido quando vazio', () => {
    expect(component.alunoForm.valid).toBeFalsy();
  });

  it('deve emitir submit quando formulário válido', () => {
    spyOn(component.submitForm, 'emit');

    component.alunoForm.patchValue({
      nome: 'Maria Silva',
      cpf: '123',
      email: 'maria@email.com',
      telefone: '9999',
      status: 'Ativo'
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalled();
  });

});
