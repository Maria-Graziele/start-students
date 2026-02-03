
import { Component } from '@angular/core'; // Component - decorador que define um componente Angular
import type { ChangeDetectorRef, OnInit } from '@angular/core'; // OnInit - interface para o ciclo de vida do Angular
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoute - acessa parâmetros da URL; Router - navegação entre rotas
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"; // FormBuilder - constrói formulários reativos; FormGroup - agrupa controles de formulário; Validators - validação de formulários
import { CommonModule } from '@angular/common';
import  { AlunoService } from '../../services/aluno.service'; // Serviço para operações relacionadas a alunos
import type { Aluno } from '../../services/aluno.service';



@Component({
  selector: 'app-editar-alunos', // Seletor - nome da tag do componente
  standalone: true, // Indica que o componente é standalone
  imports: [CommonModule, ReactiveFormsModule], // Importações necessárias para o componente, linha 16 do html estava exigindo esses imports.
  templateUrl: './editar-alunos.html', // HTML que será usado
  styleUrls: ['./editar-alunos.scss'] // Arquivo de estilo SCSS que será usado
})

// Declaração da classe
export class EditarAlunosComponent implements OnInit { // Implementa a interface OnInit para usar o ciclo de vida do Angular
  alunoForm: FormGroup; // FormGroup - representa o formulário reativo
  matricula: string = ''; // Armazena a matrícula do aluno
  urlFoto: string = ''; // Armazena a URL da foto do aluno
  formAlterado: boolean = false; // Indica se o formulário foi alterado
  alunoId: number | undefined; // Armazena o ID do aluno
  carregando: boolean = false; // Indica se os dados estão sendo carregados

  dadosOriginais: any = {}; // armazena dados originais
  fotoOriginal: string = ''; // armazena a foto original


  constructor(
    private fb: FormBuilder, // Ferramenta para construir formulários reativos
    private route: ActivatedRoute, // Obtém parâmetros da rota ativa
    private router: Router, // Navegação entre rotas, paginas
    private alunoService: AlunoService // Serviço para operações relacionadas a alunos

  ) {

    // Inicializa o formulário com controles e validadores
    this.alunoForm = this.fb.group({ // Cria o formulário
      nome: [{ value: '', disabled: true }, Validators.required], // Campo nome desabilitado com validador
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Campo CPF com validadores
      email: ['', [Validators.required, Validators.email]], // Campo email com validadores
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]], // Campo telefone com validadores
      matricula: [{ value: '', disabled: true }, Validators.required], // Campo matrícula desabilitado com validador
      status: ['Ativo', Validators.required], // Campo status com valor padrão e validador
    });
  }

ngOnInit(): void {
  this.route.params.subscribe(params => { // Observa mudanças nos parâmetros da rota
    console.log('Parâmetros da rota:', params);

    // Aceita tanto 'id' quanto 'matricula'
    if (params['id']) {
      const id = Number(params['id']);  // converte para número
      console.log('Buscando por ID:', id);
      this.carregarDadosAlunoPorId(id);   // busca por ID
    } else if (params['matricula']) {
      this.matricula = params['matricula']; // guarda matrícula
      console.log('Buscando por matrícula:', this.matricula);
      this.carregarDadosAluno(this.matricula); // busca por matrícula
    }
  });

  // Marca o formulário como alterado ao mudar qualquer campo
  this.alunoForm.valueChanges.subscribe(() => {
    this.verificarAlteracoes();
  });

  // Máscara/normalização do telefone
  const telCtrl = this.alunoForm.get('telefone');
  telCtrl?.valueChanges.subscribe(value => {
    const telefoneFormatado = this.formatarTelefone(value);  // formata
    if (telefoneFormatado !== value) {
      telCtrl.setValue(telefoneFormatado, { emitEvent: false }); // atualiza sem loop
    }
  });
}

verificarAlteracoes(): void {
  const valoresAtuais = this.alunoForm.getRawValue();

  //compara cada campo editável
  const emailMudou = valoresAtuais.email !== this.dadosOriginais.email;
  const telefoneMudou = valoresAtuais.telefone !== this.dadosOriginais.telefone;
  const statusMudou = valoresAtuais.status !== this.dadosOriginais.status;
  const fotoMudou = this.urlFoto !== this.fotoOriginal;

  // o form só está alterado se pelo menos um campo editável mudou
  this.formAlterado = emailMudou || telefoneMudou || statusMudou  || fotoMudou;
}

carregarDadosAlunoPorId(id: number): void {
  console.log('Carregando aluno por ID:', id); // log de depuração
  this.carregando = true;

  this.alunoService.ListarTodos().subscribe({ // requisita todos os alunos
    next: (alunos: Aluno[]) => {  // next: executa quando a requisição dá certo e recebe o array de alunos retornado pelo serviço.
      console.log('Total de alunos:', alunos.length); // log de quantidade

      const aluno = alunos.find((a: Aluno) => a.id === id);

      console.log('Aluno encontrado:', aluno);

      if (aluno) {  // se achou o aluno
        this.alunoId = aluno.id; // guarda id
        this.matricula = aluno.matricula; // guarda matricula

        this.alunoForm.patchValue({  // preenche o form
          nome: aluno.nome,
          cpf: aluno.cpf,
          email: aluno.email,
          telefone: aluno.telefone,
          matricula: aluno.matricula,
          status: aluno.status
        });

        this.urlFoto = aluno.urlFoto || aluno.foto || ''; // define foto

        // salva os dados originais
        this.dadosOriginais = this.alunoForm.getRawValue();
        this.fotoOriginal = this.urlFoto;

        this.formAlterado = false;  // reseta flag de alteração
        this.carregando = false;
      } else {
        console.error('Aluno não encontrado');
        alert('Aluno não encontrado.'); // feedback ao usuário
        this.router.navigate(['/alunos']);
        this.carregando = false;
      }
    },
    error: (error: any) => { // erro na requisição
      console.error('Erro ao carregar dados do aluno:', error);
      alert('Ocorreu um erro ao carregar os dados do aluno.');
      this.carregando = false;  // encerra loading
    }
  });
}
  // Formata o telefone no padrão de acordo com a digitação
  formatarTelefone(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, ''); // Remove tudo que não for número
    let telefoneFormatado = ''; // string do telefone já formatado inicialmente vazia

    if (apenasNumeros.length > 0) {
      telefoneFormatado += '(' + apenasNumeros.substring(0, 2); // Adiciona o código de área
    }
    if (apenasNumeros.length >= 3) {
      telefoneFormatado += ') ' + apenasNumeros.substring(2, 7); // Adiciona os primeiros 5 dígitos
    }
    if (apenasNumeros.length >= 8) {
      telefoneFormatado += '-' + apenasNumeros.substring(7, 11); // Adiciona os últimos 4 dígitos
    }

    return telefoneFormatado; // Retorna o telefone formatado
  }

  // Carrega os dados do aluno com base na matrícula

  carregarDadosAluno(matricula: string): void {
    this.carregando = true; // Indica que os dados estão sendo carregados

    this.alunoService.ListarTodos().subscribe({ // Chama o serviço para listar todos os alunos
      next: (alunos: Aluno[]) => {
        const aluno = alunos.find((a: Aluno) => a.matricula === matricula); // Encontra o aluno pela matrícula

        if (aluno) {
          this.alunoId = aluno.id; // Armazena o ID do aluno
          this.alunoForm.patchValue({ // Preenche o formulário com os dados do aluno
            nome: aluno.nome,
            cpf: aluno.cpf,
            email: aluno.email,
            telefone: aluno.telefone,
            matricula: aluno.matricula,
            status: aluno.status
          });

          this.urlFoto = aluno.urlFoto || aluno.foto || ''; // Atribui a URL da foto, se existir
          this.formAlterado = false; // Reseta o estado de alteração do formulário
          this.carregando = false; // Indica que o carregamento foi concluído
        } else {
          alert('Aluno não encontrado.'); // Alerta se o aluno não for encontrado
          this.router.navigate(['/alunos']); // Navega de volta para a lista de alunos
          this.carregando = false; // Indica que o carregamento foi concluído
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar dados do aluno:', error); // Loga o erro no console
        alert('Ocorreu um erro ao carregar os dados do aluno.'); // Alerta o usuário sobre o erro
        this.carregando = false; // Indica que o carregamento foi concluído
      }
    });
  }

    alterarFoto(): void {
      const inputElement = document.createElement('input'); // Cria um elemento de input
      inputElement.type = 'file'; // Define o tipo do input como arquivo
      inputElement.accept = 'image/jpeg, image/png, image/gif'; // Aceita apenas arquivos de imagem

      inputElement.onchange = (event: any) => { // Evento disparado quando um arquivo é selecionado
        this.onFotoSelecionada(event); // Chama o método para processar o arquivo selecionado
      };

      inputElement.click(); // Simula um clique no input para abrir a janela de seleção de arquivos
    }

    onFotoSelecionada(event: any): void { // Event - evento disparado ao selecionar uma foto. Any - tipo genérico
    const arquivo = event?.target.files[0]; // Obtém o arquivo selecionado

    if (arquivo) {
      const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de arquivos permitidos

      if (!tiposPermitidos.includes(arquivo.type)) {
        alert('Tipo de arquivo não permitido. Por favor, selecione uma imagem válida.');
        return;
      }

      const tamanhoMaximo = 5 * 1024 * 1024; // Tamanho máximo permitido (5MB)
      if (arquivo.size > tamanhoMaximo) {
        alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
        return;
      }

      const reader = new FileReader(); // Cria um leitor de arquivos

      reader.onload = (e: any) => { // Evento disparado quando a leitura é concluída
        this.urlFoto = e.target.result; // Atribui o resultado da leitura à URL da foto
        this.verificarAlteracoes(); //verifica alterações ao mudar a foto
      };

      reader.readAsDataURL(arquivo); // Lê o arquivo como uma URL de dados
    }
  }

  salvar(): void {
    this.salvarAlteracoes(); // Reaproveita a lógica existente
  }

  salvarAlteracoes(): void {
    if (this.alunoForm.valid && this.formAlterado && this.alunoId) { // Verifica se o formulário é válido, foi alterado e o ID do aluno existe
      const dadosAlunos = this.alunoForm.getRawValue(); // Obtém os valores do formulário, incluindo os desabilitados

      const alunoAtualizado: Aluno = { // Cria um objeto Aluno com os dados atualizados
        id: this.alunoId,
        nome: dadosAlunos.nome,
        cpf: dadosAlunos.cpf,
        email: dadosAlunos.email,
        telefone: dadosAlunos.telefone,
        matricula: dadosAlunos.matricula,
        status: dadosAlunos.status,
        ativo: dadosAlunos.status === 'Ativo',
        foto: this.urlFoto
      };

      this.alunoService.Atualizar(this.alunoId, alunoAtualizado).subscribe({ // Chama o serviço para atualizar o aluno
        next: () => {
          alert('Dados do aluno atualizados com sucesso!'); // Alerta de sucesso
          this.formAlterado = false; // Reseta o estado de alteração do formulário
          this.router.navigate(['/alunos']); // Navega de volta para a lista de alunos
        },
        error: (error: any) => {
          console.error('Erro ao atualizar dados do aluno:', error); // Loga o erro no console
          alert('Ocorreu um erro ao atualizar os dados do aluno.'); // Alerta o usuário sobre o erro
        }
      });
    }
  }

  voltar(): void {
    this.cancelar(); // Reaproveita a lógica existente
  }

  cancelar(): void {
    if (this.formAlterado) { // Verifica se o formulário foi alterado
      const confirmar = confirm('Você tem alterações não salvas. Tem certeza que deseja sair?'); // Confirmação do usuário
      if (!confirmar) {
        return; // Sai do método se o usuário cancelar
      }
    }
    this.router.navigate(['/alunos']); // Navega de volta para a lista de alunos
  }

  get f() { //get f() é um método getter que retorna os controles do formulário.
    return this.alunoForm.controls; // Retorna os controles do formulário para fácil acesso no template
  }

  get podeHabilitar(): boolean { // Verifica se o botão salvar deve ser habilitado
    return this.alunoForm.valid && this.formAlterado; // Habilita se o formulário for válido e tiver sido alterado
  }

}
