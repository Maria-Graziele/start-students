import { Component, type OnInit, ChangeDetectorRef } from "@angular/core"; // decorador, ciclo de vida e detecção manual
import { CommonModule } from "@angular/common"; // *ngIf, *ngFor para standalone
import { FormsModule } from "@angular/forms"; // ngModel, input, etc.
import { Router } from '@angular/router'; // navegação programática
import { AlunoService, type Aluno } from '../../services/aluno.service'; // API e modelo
import { ModalConfirmacaoComponent } from "../modal-confirmacao/modal-confirmacao.js";

@Component({
  selector: "app-listagem-de-alunos",         // tag do componente
  standalone: true,                            // sem NgModule (standalone)
  imports: [CommonModule, FormsModule, ModalConfirmacaoComponent],        // módulos usados no template
  templateUrl: "./listagem-de-alunos.html",    // caminho do HTML
  styleUrls: ["./listagem-de-alunos.scss"],    // estilos do componente
})
export class AlunosComponent implements OnInit { // implementa OnInit

  alunos: Aluno[] = [];            // lista completa vinda da API
  alunosFiltrados: Aluno[] = [];   // resultado do filtro
  alunosPaginados: Aluno[] = [];   // fatia da página atual
  paginaAtual: number = 1;         // página corrente
  itensPorPagina: number = 4;      // quantos itens por página
  termoBusca: string = '';         // texto digitado na busca
  totalPaginas: number = 1;        // total de páginas calculado
  carregando: boolean = false;     // flag de loading
  erro: string = '';               // mensagem de erro

  mostrarModal: boolean = false;
  alunoParaExcluir: Aluno | null = null;

  constructor(
    private router: Router,            // para navegar entre rotas
    private alunoService: AlunoService,// chamadas ao backend
    private cdr: ChangeDetectorRef     // forçar detecção quando necessário
  ) {
    console.log('Construtor - mostrarModal:', this.mostrarModal);
  }

  ngOnInit(): void {
    this.carregarAlunos();             // carrega dados ao iniciar
  }

  carregarAlunos(): void {
    this.carregando = true;            // liga loading
    this.erro = '';                    // limpa erro anterior
    this.cdr.detectChanges();          // reflete loading na UI

    this.alunoService.listarTodos().subscribe({ // busca todos
      next: (data: Aluno[]) => {       // sucesso
        console.log('1. Dados recebidos:', data);
        console.log('2. Quantidade:', data.length);

        this.alunos = data;            // guarda lista original
        this.filtrarAlunos();          // aplica filtro + paginação
        this.carregando = false;       // desliga loading
        console.log('9. Carregando setado para:', this.carregando);
        this.cdr.detectChanges();      // atualiza UI
      },
      error: (error: any) => {         // erro na requisição
        this.erro = 'Erro ao carregar alunos. Verifique se o backend está rodando.';
        this.carregando = false;       // desliga loading também no erro
        this.cdr.detectChanges();      // mostra mensagem de erro
        console.error('Erro ao carregar alunos:', error);
      }
    });
  }

  filtrarAlunos(): void {
    console.log('3. Filtrando... alunos:', this.alunos.length);

    if (this.termoBusca.trim() === '') {
      this.alunosFiltrados = [...this.alunos]; // sem busca: copia todos
    } else {
      const termo = this.termoBusca.toLowerCase(); // normaliza
      this.alunosFiltrados = this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(termo) ||        // por nome
        aluno.matricula.toLowerCase().includes(termo) ||   // por matrícula
        aluno.status.toLowerCase().includes(termo)         // por status
      );
    }

    console.log('4. Alunos filtrados:', this.alunosFiltrados.length);

    this.totalPaginas = Math.ceil(this.alunosFiltrados.length / this.itensPorPagina); // calcula páginas
    if (this.totalPaginas < 1) this.totalPaginas = 1; // mínimo 1
    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas; // ajusta página fora do limite
    }

    this.atualizarPaginacao(); // recalcula fatia da página
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina; // índice inicial
    const fim = inicio + this.itensPorPagina;                    // índice final (exclusivo)
    this.alunosPaginados = this.alunosFiltrados.slice(inicio, fim); // fatia da lista
  }

  buscarAluno(event: Event): void {
    const input = event.target as HTMLInputElement; // pega o input
    this.termoBusca = input.value;                  // atualiza termo
    this.paginaAtual = 1;                           // volta pra pág. 1
    this.filtrarAlunos();                           // refaz filtro/paginação
  }

  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) { // valida faixa
      this.paginaAtual = pagina;                      // muda a página
      this.atualizarPaginacao();                      // atualiza fatia
    }
  }

  getPaginas(): number[] {
    return Array.from({length: this.totalPaginas}, (_, i) => i + 1);
  }

  verDetalhes(aluno: Aluno): void {
    this.router.navigate(['/detalhes-aluno', aluno.id]); // navega p/ detalhes
  }

  editarAluno(aluno: Aluno): void {
    this.router.navigate(['/editar-alunos', aluno.id || aluno.matricula]); // navega p/ edição
  }

  excluirAluno(aluno: Aluno): void {
   this.alunoParaExcluir = aluno; // guarda o aluno
   this.mostrarModal = true; //abre o modal
      }

      confirmarExclusao(): void {
        if (!this.alunoParaExcluir || ! this.alunoParaExcluir.id) {
          console.error('ID do aluno não encontrado');
          this.mostrarModal = false;
          return;
        }

      this.alunoService.deletar(this.alunoParaExcluir.id).subscribe({
        next: () => {
          console.log('Aluno excluído com sucesso'); // sucesso
          this.mostrarModal = false; // fecha o modal
          this.alunoParaExcluir = null; // limpa a referência
          this.carregarAlunos(); // recarrega a lista
        },
        error: (error: any) => {
          console.error('Erro ao excluir aluno:', error); // log erro
          alert('Erro ao excluir aluno. Tente novamente.'); // feedback
        }
      });
    }

    // método chamado quando clica em cancelar
    cancelarExclusao(): void {
      this.mostrarModal = false; // fecha o modal
      this.alunoParaExcluir = null; // limpa a referência
    }

  novoAluno(): void {
    this.router.navigate(['/novo-aluno']); // abre tela de cadastro
  }

  toggleStatus(aluno: Aluno): void {
    if (!aluno.id) {
      console.error('ID do aluno não encontrado'); // valida ID
      return;
    }

    const novoStatus = aluno.status === 'Ativo' ? 'Inativo' : 'Ativo'; // alterna status
    const alunoAtualizado = { ...aluno, status: novoStatus };          // cria novo objeto

    this.alunoService.atualizar(aluno.id, alunoAtualizado).subscribe({
      next: (alunoRetornado: Aluno) => {
        console.log('Status atualizado com sucesso'); // sucesso
        aluno.status = alunoRetornado.status;         // sincroniza UI
        this.filtrarAlunos();                         // re-filtra/pagina
      },
      error: (error: any) => {
        console.error('Erro ao atualizar status:', error); // erro
        alert('Erro ao atualizar status. Tente novamente.'); // feedback
      }
    });
  }
}
