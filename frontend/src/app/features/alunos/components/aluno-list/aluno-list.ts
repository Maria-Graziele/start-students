import { Component, type OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AlunoService, type Aluno, type PageResponse } from '../../services/aluno.service';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.js";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.js";

@Component({
  selector: "app-aluno-list",
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, PaginationComponent, SearchBarComponent],
  templateUrl: "./aluno-list.html",
  styleUrls: ["./aluno-list.scss"],
})
export class AlunosComponent implements OnInit {

  // Dados da página atual
  alunos: Aluno[] = [];

  // Controles de paginação. Backend.
  paginaAtual: number =0;        // Backend usa 0-based
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  totalElementos: number = 0;

  termoBusca: string = '';

  carregando: boolean = false;
  erro: string = '';

  mostrarModal: boolean = false;
  alunoParaExcluir: Aluno | null = null;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.carregando = true;
    this.erro = '';

    this.alunoService.listarComPaginacao(
      this.paginaAtual,
      this.itensPorPagina,
      this.termoBusca ? { search: this.termoBusca } : undefined
    ).subscribe({
      next: (response: PageResponse<Aluno>) => {
        this.alunos = response.content;
        this.totalPaginas = response.totalPages;
        this.totalElementos = response.totalElements;
        this.paginaAtual = response.number; // sincroniza com o backend
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar alunos:', error);
        this.erro = 'Erro ao carregar alunos. Verifique se o backend está rodando.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
  onSearch(termo: string): void {
    this.termoBusca = termo;
    this.paginaAtual = 0;
    this.carregarAlunos();
  }

 aoMudarPagina(novaPagina: number): void { // função certa para usar o pagination
  this.paginaAtual = novaPagina;
  this.carregarAlunos();
 }
  verDetalhes(aluno: Aluno): void {
    this.router.navigate(['/alunos', aluno.id]);
  }

  editarAluno(aluno: Aluno): void {
    this.router.navigate(['/alunos/editar', aluno.id]);
  }

  excluirAluno(aluno: Aluno): void {
    this.alunoParaExcluir = aluno;
    this.mostrarModal = true;
  }

  confirmarExclusao(): void {
    if (!this.alunoParaExcluir?.id) {
      console.error('ID do aluno não encontrado');
      this.mostrarModal = false;
      return;
    }

    this.alunoService.deletar(this.alunoParaExcluir.id).subscribe({
      next: () => {
        console.log('Aluno excluído com sucesso');
        this.mostrarModal = false;
        this.alunoParaExcluir = null;

        // Se a página atual ficou vazia e não é a primeira, volta uma página
        if (this.alunos.length === 1 && this.paginaAtual > 0) {
          this.paginaAtual--;
        }

        this.carregarAlunos();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno. Tente novamente.');
        this.mostrarModal = false;
      }
    });
  }

  cancelarExclusao(): void {
    this.mostrarModal = false;
    this.alunoParaExcluir = null;
  }

  novoAluno(): void {
    this.router.navigate(['/alunos/novo']);
  }

  // Alterna status do aluno.
  toggleStatus(aluno: Aluno): void {
  if (!aluno.id) {
    console.error('ID do aluno não encontrado');
    return;
  }

  const novoStatus: 'Ativo' | 'Inativo' = aluno.status === 'Ativo' ? 'Inativo' : 'Ativo';
  const alunoAtualizado: Aluno = {
    ...aluno,
    status: novoStatus,
    ativo: novoStatus === 'Ativo'
  };

  this.alunoService.atualizar(aluno.id, alunoAtualizado).subscribe({
    next: (alunoRetornado: Aluno) => {
      console.log('Status atualizado com sucesso');
      // Recarrega a página atual para garantir consistência
      this.carregarAlunos();
    },
    error: (error: HttpErrorResponse) => {
      console.error('Erro ao atualizar status:', error);

      // Trata erros específicos do backend
      if (error.status === 409) {
        alert('Erro: Dados duplicados. Verifique CPF, email ou matrícula.');
      } else if (error.status === 400) {
        alert('Erro de validação: ' + (error.error?.message || 'Dados inválidos'));
      } else {
        alert('Erro ao atualizar status. Tente novamente.');
      }
    }
  });
}
}
