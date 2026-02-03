import { Component, type OnInit, ChangeDetectorRef } from '@angular/core'; // decoradores e tipos do Angular
import { CommonModule } from '@angular/common'; // CommonModule: fornece diretivas básicas como *ngIf, *ngFor para componentes standalone
import { ActivatedRoute, Router } from '@angular/router'; // Rota e navegação
import { AlunoService, type Aluno } from '../../services/aluno.service'; // // AlunoService e o tipo Aluno: serviço que chama a API e o modelo tipado do aluno

@Component({
  selector: 'app-detalhes-do-aluno', // seletor do componente
  standalone: true, // padrão standalone (sem NgModule)
  imports: [CommonModule], // módulos necessários para o template
  templateUrl: './detalhes-do-aluno.html',
  styleUrls: ['./detalhes-do-aluno.scss']
})
export class DetalhesDoAlunoComponent implements OnInit { // implementa OnInit para carregar dados ao iniciar
  aluno: Aluno | null = null; // estado com os dados do aluno
  carregando: boolean = false; // flag de loading
  erro: string = ''; // mensagem de erro exibida no template quando algo falha
  private carregouUmaVez = false; // Proteção contra loop
  private imagemErroTratado = false; // Proteção contra loop de imagem

  constructor( //método chamado no momento em que o componente é criado. Usado para injeção de dependências e inicializações simples.
    private route: ActivatedRoute, // injeta rota atual para ler param 'id'
    private router: Router, // injeta roteador para fazer navegação programática
    private alunoService: AlunoService, // serviço responsável por chamar a API de alunos
    private cdr: ChangeDetectorRef
  ) {
    console.log('Constructor chamado');
  }

  ngOnInit() {
    // chamado após a construção do componente, bom ponto para carregar dados.
    console.log('ngOnInit chamado - carregouUmaVez:', this.carregouUmaVez);

    // Proteção: só carrega uma vez
    if (this.carregouUmaVez) {
      console.log('AVISO: ngOnInit chamado mais de uma vez! Ignorando...');
      return; // sai sem refazer requisições
    }

    this.carregouUmaVez = true; // marca que já inicializou

    // Lê o parâmetro de rota 'id'
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID capturado:', idParam);

    // Validação: se não veio id, exibe erro.
    if (!idParam) {
      this.erro = 'ID do aluno não informado.';
      console.log('Erro: ID não informado');
      return;
    }

    // Converte o id de string para número
    const idNum = Number(idParam);
    console.log('ID convertido:', idNum, 'isNaN:', isNaN(idNum));

    // Validação, se não for número, evita requisição inválida
    if (isNaN(idNum)) {
      this.erro = 'ID inválido.';
      console.log('Erro: ID inválido (NaN)');
      return;
    }

    // Com id válido, chama o método que consulta a API
    this.carregarAluno(idNum);
  }

   // evita várias chamadas simultâneas
  carregarAluno(id: number) {
    console.log('carregarAluno iniciado - ID:', id, 'carregando:', this.carregando);

    // Se já está carregando, não faz nova requisição
    if (this.carregando) {
      console.log('AVISO: Já está carregando! Ignorando nova chamada...');
      return;
    }

    // Sinaliza início do loading e limpa erro anterior
    this.carregando = true;
    this.erro = '';
    console.log(' carregando = true');
    this.cdr.detectChanges(); // força detecção de mudanças

     // Chama o serviço que consulta o backend por ID
    this.alunoService.buscarPorId(id).subscribe({
      next: (aluno: Aluno) => {
        console.log('Aluno recebido:', aluno);
        this.aluno = aluno;  // atualiza estado com os dados
        this.carregando = false; // encerra loading
        this.imagemErroTratado = false; // Reseta flag de erro de imagem
        console.log('carregando = false');
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error(' Erro ao buscar aluno:', erro);
        this.erro = 'Aluno não encontrado.';
        this.carregando = false; // encerra loading também em erro
        console.log(' carregando = false (erro)');
        this.cdr.detectChanges();
      }
    });
  }

  onImgError(event: Event): void {
    // Proteção: só trata erro UMA vez
    if (this.imagemErroTratado) {
      console.log(' Imagem já teve erro tratado, ignorando...');
      return;
    }

    // Recupera o elemento <img> que disparou o erro
    const img = event.target as HTMLImageElement;
    console.log(' Erro ao carregar imagem:', img.src);

    // Marca que o erro já foi tratado e substitui a imagem por um placeholder local
    this.imagemErroTratado = true;
    img.src = 'assets/icon/placeholder-user.png';  // caminho do avatar padrão

    console.log(' Substituindo por placeholder');
  }

  voltarParaLista() {
    // Navegação programática de volta para a rota de listagem
    console.log('Voltando para lista');
    this.router.navigate(['/alunos']);
  }
}
