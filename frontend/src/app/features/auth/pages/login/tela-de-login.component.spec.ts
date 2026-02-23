import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TelaDeLoginComponent } from './tela-de-login';

describe('TelaDeLoginComponent', () => {

  let component: TelaDeLoginComponent;
  let fixture: ComponentFixture<TelaDeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaDeLoginComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaDeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar usuário corretamente', () => {
    component.username = 'maria123';
    component.verificarCampos();
    expect(component.usuarioValido).toBe(true);
  });

});
