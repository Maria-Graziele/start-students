import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { PhotoUploadComponent } from '../../../../shared/components/photo-upload/photo-upload';
import { CpfMaskDirective } from '../../../../shared/directives/cpf-mask.directive';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import type { Aluno } from '../../../../shared/models/aluno.model';
import { nomeCompletoValidator } from '../../../../shared/validators/nome-completo.validator.js';
import { noExtraSpacesValidator } from '../../../../shared/validators/no-extra-spaces.validator.js';
import { normalizeSpaces, capitalizeWords } from '../../../../shared/utils/string.utils.js';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    PhotoUploadComponent,
    CpfMaskDirective,
    PhoneMaskDirective,
    ModalComponent
  ],
  templateUrl: './aluno-form.html',
  styleUrls: ['./aluno-form.scss']
})
export class AlunoFormComponent implements OnInit, OnChanges {

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() aluno: Aluno | null = null;
  @Input() errosBackend: { [key: string]: string } = {};
  @Input() salvando = false;

  @Output() submitForm = new EventEmitter<Aluno>();
  @Output() cancel = new EventEmitter<void>();

  alunoForm!: FormGroup;
  fotoUrl?: string;

  mostrarModalCancelar = false;

  private valorInicialNormalizado!: string;

  constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.criarFormulario();
  if (this.aluno) {
    this.preencherFormulario(this.aluno);
  }
}

ngOnChanges(changes: SimpleChanges): void {

  if (changes['aluno'] && changes['aluno'].currentValue && this.alunoForm) {
    this.preencherFormulario(changes['aluno'].currentValue);
  }

  if (changes['mode'] && this.alunoForm) {
    this.aplicarModo();
  }
}

 private criarFormulario(): void {

  this.alunoForm = this.fb.group({
    nome: [''],
    cpf: [''],
    email: [''],
    telefone: [''],
    matricula: [{ value: '', disabled: true }],
    status: ['Ativo']
  });

  this.aplicarModo();
}

  private aplicarModo(): void {

    if (this.mode === 'edit') {

      // Não editáveis
      this.alunoForm.get('nome')?.disable();
      this.alunoForm.get('matricula')?.disable();
      this.alunoForm.get('cpf')?.disable();

    } else {

      this.alunoForm.get('nome')?.enable();
      this.alunoForm.get('cpf')?.enable();
    }
  }

  private preencherFormulario(aluno: Aluno): void {

  if (!this.alunoForm) return;

  this.alunoForm.patchValue({
    nome: aluno.nome,
    cpf: aluno.cpf,
    email: aluno.email,
    telefone: aluno.telefone,
    matricula: aluno.matricula,
    status: aluno.ativo ? 'Ativo' : 'Inativo'
  }, { emitEvent: false });

  this.fotoUrl = aluno.foto;

  this.valorInicialNormalizado = this.obterValorNormalizado();
}

  private obterValorNormalizado(): string {

    const v = this.alunoForm.getRawValue();

    return JSON.stringify({
      email: normalizeSpaces(v.email),
      telefone: normalizeSpaces(v.telefone),
      status: v.status,
      foto: this.fotoUrl ?? null
    });
  }

  get houveAlteracaoReal(): boolean {

    if (this.mode !== 'edit') return true;
    if (!this.valorInicialNormalizado) return false;

    return this.obterValorNormalizado() !== this.valorInicialNormalizado;
  }

  onFotoSelecionada(base64: string): void {
    this.fotoUrl = base64;
  }

  onFotoErro(erro: string): void {
    console.error('Erro ao selecionar foto:', erro);
  }


  onSubmit(): void {

    if (this.alunoForm.invalid) {
      this.alunoForm.markAllAsTouched();
      return;
    }

    const formValue = this.alunoForm.getRawValue();

    const alunoParaEnviar: Aluno = {
      id: this.aluno?.id,
      nome: capitalizeWords(formValue.nome),
      cpf: formValue.cpf,
      email: normalizeSpaces(formValue.email),
      telefone: normalizeSpaces(formValue.telefone),
      matricula: formValue.matricula,
      status: formValue.status,
      ativo: formValue.status === 'Ativo',
      foto: this.fotoUrl
    };

    this.submitForm.emit(alunoParaEnviar);
  }

  onCancel(): void {

    if (this.mode === 'edit' && this.houveAlteracaoReal && !this.salvando) {
      this.mostrarModalCancelar = true;
    } else {
      this.cancel.emit();
    }
  }

  confirmarCancelamento(): void {
    this.mostrarModalCancelar = false;
    this.cancel.emit();
  }

  fecharModalCancelar(): void {
    this.mostrarModalCancelar = false;
  }


  get submitButtonText(): string {
    if (this.salvando) {
      return this.mode === 'create' ? 'Cadastrando...' : 'Salvando...';
    }
    return this.mode === 'create' ? 'Cadastrar' : 'Salvar Alterações';
  }

  get titulo(): string {
    return this.mode === 'create' ? 'Novo Aluno' : 'Editar Aluno';
  }

  get nome() { return this.alunoForm.get('nome'); }
  get cpf() { return this.alunoForm.get('cpf'); }
  get email() { return this.alunoForm.get('email'); }
  get telefone() { return this.alunoForm.get('telefone'); }
  get matricula() { return this.alunoForm.get('matricula'); }
  get status() { return this.alunoForm.get('status'); }
}
