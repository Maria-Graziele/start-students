import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Aluno } from '../../../../shared/models/aluno.model';
import { nomeCompletoValidator } from '../../../../shared/validators/nome-completo.validator';
import { noExtraSpacesValidator } from '../../../../shared/validators/no-extra-spaces.validator';
import { normalizeSpaces, capitalizeWords } from '../../../../shared/utils/string.utils';

@Component({
  selector: 'app-aluno-form',
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

  alunoForm: FormGroup;
  fotoUrl: string | null = null;

  mostrarModalCancelar = false;
  private valorInicialNormalizado: string;

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
      nome: ['', [Validators.required, nomeCompletoValidator(), noExtraSpacesValidator()]],
      cpf: this.mode === 'create' ? ['', Validators.required] : [''],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      matricula: [{ value: '', disabled: true }],
      status: ['Ativo']
    });

    this.aplicarModo();
  }

  private aplicarModo(): void {
    const nomeControl = this.alunoForm.get('nome');
    const matriculaControl = this.alunoForm.get('matricula');
    const cpfControl = this.alunoForm.get('cpf');

    if (this.mode === 'edit') {
      if (nomeControl) { nomeControl.disable(); }
      if (matriculaControl) { matriculaControl.disable(); }
      if (cpfControl) { cpfControl.disable(); }
    } else {
      if (nomeControl) { nomeControl.enable(); }
      if (cpfControl) { cpfControl.enable(); }
    }
  }

  private preencherFormulario(aluno: Aluno): void {
    if (!this.alunoForm) { return; }

    this.alunoForm.patchValue({
      nome: aluno.nome,
      cpf: aluno.cpf,
      email: aluno.email,
      telefone: aluno.telefone,
      matricula: aluno.matricula,
      status: aluno.ativo ? 'Ativo' : 'Inativo'
    }, { emitEvent: false });

    this.fotoUrl = aluno.foto ? aluno.foto : null;
    this.valorInicialNormalizado = this.obterValorNormalizado();
  }

  private obterValorNormalizado(): string {
    const v = this.alunoForm.getRawValue();

    return JSON.stringify({
      email: normalizeSpaces(v.email),
      telefone: normalizeSpaces(v.telefone),
      status: v.status,
      foto: this.fotoUrl != null ? this.fotoUrl : null
    });
  }

  get houveAlteracaoReal(): boolean {
    if (this.mode !== 'edit') { return true; }
    if (!this.valorInicialNormalizado) { return false; }

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
      id: this.aluno ? this.aluno.id : undefined,
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
