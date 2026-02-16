import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AlunoFormComponent } from '../../components/aluno-form/aluno-form';
import { AlunoService } from '../../services/aluno.service';
import type { Aluno } from '../../../../shared/models/aluno.model';

@Component({
  selector: 'app-novo-aluno-page',
  standalone: true,
  imports: [AlunoFormComponent],
  template: `
    <app-aluno-form
      mode="create"
      [errosBackend]="errosBackend"
      [salvando]="salvando"
      (submitForm)="onCriar($event)"
      (cancel)="onCancelar()">
    </app-aluno-form>
  `
})
export class NovoAlunoPage {
  errosBackend: { [key: string]: string } = {};
  salvando: boolean = false;

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) {}

  onCriar(aluno: Aluno): void {
    this.salvando = true;
    this.errosBackend = {};

    this.alunoService.criar(aluno).subscribe({
      next: (alunoCriado) => {
        console.log('Aluno cadastrado com sucesso:', alunoCriado);
        this.salvando = false;
        this.router.navigate(['/alunos']);
      },
      error: (erro: HttpErrorResponse) => {
        console.error('Erro ao cadastrar aluno:', erro);
        this.salvando = false;
        this.processarErrosBackend(erro);
      }
    });
  }

  onCancelar(): void {
    this.router.navigate(['/alunos']);
  }

  private processarErrosBackend(erro: HttpErrorResponse): void {
    if (erro.status === 400 && erro.error?.errors) {
      // Erros de validação (Bean Validation)
      this.errosBackend = erro.error.errors;
    } else if (erro.status === 409) {
      // Erro de duplicidade
      this.errosBackend = {
        geral: erro.error?.message || 'Dados duplicados. Verifique CPF, email ou matrícula.'
      };
    } else if (erro.status === 400) {
      // Outros erros de validação
      this.errosBackend = {
        geral: erro.error?.message || 'Erro de validação. Verifique os dados.'
      };
    } else {
      // Erro genérico
      this.errosBackend = {
        geral: 'Erro ao cadastrar aluno. Tente novamente.'
      };
    }
  }
}
