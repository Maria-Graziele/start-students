import { Component, type OnInit, type OnDestroy} from '@angular/core';
import { ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlunoFormComponent } from '../../components/aluno-form/aluno-form';
import { AlunoService } from '../../services/aluno.service';
import type { Aluno } from '../../../../shared/models/aluno.model';

@Component({
  selector: 'app-editar-aluno-page',
  standalone: true,
  imports: [CommonModule, AlunoFormComponent],
  template: `
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
  `,
  styles: [`
    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: 2rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-container p {
      color: #dc3545;
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .btn-voltar {
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-voltar:hover {
      background-color: #0056b3;
    }
  `]
})
export class EditarAlunoPage implements OnInit, OnDestroy {
  aluno: Aluno | null = null;
  errosBackend: { [key: string]: string } = {};
  salvando: boolean = false;
  erro: string = '';

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  console.log('ngOnInit chamado');

  this.routeSub = this.route.paramMap.subscribe(params => {
    console.log('paramMap emitiu:', params);
    const id = Number(params.get('id'));
    console.log('id extraído:', id);

    if (!id) {
      console.log('id inválido, saindo');
      return;
    }

    this.aluno = null;
    this.erro = '';

    this.alunoService.buscarPorId(id).subscribe({
      next: (aluno: Aluno) => {
        this.aluno = aluno;
        this.cdr.detectChanges();
      },
      error: (erro: HttpErrorResponse) => {
        this.erro = 'Erro ao carregar aluno';
        this.cdr.detectChanges();
      }
    });
  });
}

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onAtualizar(alunoAtualizado: Aluno): void {
    if (!alunoAtualizado.id) {
      console.error('ID do aluno não encontrado');
      return;
    }

    this.salvando = true;
    this.errosBackend = {};

    this.alunoService.atualizar(alunoAtualizado.id, alunoAtualizado).subscribe({
      next: (aluno) => {
        this.salvando = false;
        this.router.navigate(['/alunos']);
      },
      error: (erro: HttpErrorResponse) => {
        this.salvando = false;
        this.processarErrosBackend(erro);
      }
    });
  }

  onCancelar(): void {
    this.router.navigate(['/alunos']);
  }

  voltar(): void {
    this.router.navigate(['/alunos']);
  }

  private processarErrosBackend(erro: HttpErrorResponse): void {
    if (erro.status === 400 && erro.error?.errors) {
      this.errosBackend = erro.error.errors;
    } else if (erro.status === 409) {
      this.errosBackend = {
        geral: erro.error?.message || 'Dados duplicados. Verifique CPF, email ou matrícula.'
      };
    } else if (erro.status === 400) {
      this.errosBackend = {
        geral: erro.error?.message || 'Erro de validação. Verifique os dados.'
      };
    } else {
      this.errosBackend = {
        geral: 'Erro ao atualizar aluno. Tente novamente.'
      };
    }
  }
}
