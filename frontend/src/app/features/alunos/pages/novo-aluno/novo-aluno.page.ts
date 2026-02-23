import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../../../shared/models/aluno.model';

@Component({
  selector: 'app-novo-aluno-page',
  template: `
    <div class="app-container">
      <app-aluno-form
        mode="create"
        [errosBackend]="errosBackend"
        [salvando]="salvando"
        (submitForm)="onCriar($event)"
        (cancel)="onCancelar()">
      </app-aluno-form>
    </div>
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

    this.alunoService.criar(aluno).subscribe(
      (alunoCriado) => {
        console.log('Aluno cadastrado com sucesso:', alunoCriado);
        this.salvando = false;
        this.router.navigate(['/alunos']);
      },
      (erro: HttpErrorResponse) => {
        console.error('Erro ao cadastrar aluno:', erro);
        this.salvando = false;
        this.processarErrosBackend(erro);
      }
    );
  }

  onCancelar(): void {
    this.router.navigate(['/alunos']);
  }

  private processarErrosBackend(erro: HttpErrorResponse): void {

    // 400 com erros de validação
    if (erro.status === 400 && erro.error && erro.error.errors) {
      this.errosBackend = erro.error.errors;
      return;
    }

    // 409 - duplicidade
    if (erro.status === 409) {

      if (erro.error && erro.error.errors) {
        this.errosBackend = erro.error.errors;
      } else {
        this.errosBackend = {
          cpf: erro.error && erro.error.message
            ? erro.error.message
            : 'CPF já cadastrado'
        };
      }

      return;
    }

    // Outros erros
    this.errosBackend = {
      geral: 'Erro ao cadastrar aluno. Tente novamente.'
    };
  }
}
