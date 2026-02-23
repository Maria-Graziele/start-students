import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../../../shared/models/aluno.model';

@Component({
  selector: 'app-editar-aluno-page',
  template: `
    <div class="app-container">

      <div *ngIf="erro" class="error-container">
        <p>{{ erro }}</p>
        <button (click)="voltar()" class="btn-voltar">Voltar para lista</button>
      </div>

      <div *ngIf="!aluno && !erro" class="loading-container">
        <div class="spinner"></div>
        <p>Carregando aluno..</p>
      </div>

      <app-aluno-form
        *ngIf="aluno"
        mode="edit"
        [aluno]="aluno"
        [errosBackend]="errosBackend"
        [salvando]="salvando"
        (submitForm)="onAtualizar($event)"
        (cancel)="onCancelar()">
      </app-aluno-form>

    </div>
  `
})
export class EditarAlunoPage implements OnInit, OnDestroy {

  aluno: Aluno | null = null;
  errosBackend: { [key: string]: string } = {};
  salvando: boolean = false;
  erro: string = '';

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.routeSub = this.route.paramMap.subscribe(function(params) {

      var id = Number(params.get('id'));

      if (!id) {
        return;
      }

      this.aluno = null;
      this.erro = '';

      this.alunoService.buscarPorId(id).subscribe(
        function(aluno: Aluno) {
          this.aluno = aluno;
          this.cdr.detectChanges();
        }.bind(this),
        function(erro: HttpErrorResponse) {
          this.erro = 'Erro ao carregar aluno';
          this.cdr.detectChanges();
        }.bind(this)
      );

    }.bind(this));
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  onAtualizar(alunoAtualizado: Aluno): void {

    if (!alunoAtualizado.id) {
      console.error('ID do aluno não encontrado');
      return;
    }

    this.salvando = true;
    this.errosBackend = {};

    this.alunoService.atualizar(alunoAtualizado.id, alunoAtualizado).subscribe(
      function() {
        this.salvando = false;
        this.router.navigate(['/alunos']);
      }.bind(this),
      function(erro: HttpErrorResponse) {
        this.salvando = false;
        this.processarErrosBackend(erro);
      }.bind(this)
    );
  }

  onCancelar(): void {
    this.router.navigate(['/alunos']);
  }

  voltar(): void {
    this.router.navigate(['/alunos']);
  }

  private processarErrosBackend(erro: HttpErrorResponse): void {

    if (erro.status === 400 && erro.error && erro.error.errors) {
      this.errosBackend = erro.error.errors;
    }
    else if (erro.status === 409) {
      this.errosBackend = {
        geral: erro.error && erro.error.message
          ? erro.error.message
          : 'Dados duplicados. Verifique CPF, email ou matrícula.'
      };
    }
    else if (erro.status === 400) {
      this.errosBackend = {
        geral: erro.error && erro.error.message
          ? erro.error.message
          : 'Erro de validação. Verifique os dados.'
      };
    }
    else {
      this.errosBackend = {
        geral: 'Erro ao atualizar aluno. Tente novamente.'
      };
    }
  }
}
