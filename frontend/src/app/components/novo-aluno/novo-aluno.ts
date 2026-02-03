import { Component, ChangeDetectorRef } from '@angular/core'; // componente e detecção manual
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // forms reativos
import { Router } from '@angular/router'; // navegação
import { CommonModule } from '@angular/common'; // diretivas básicas
import { AlunoService } from '../../services/aluno.service'; // chamadas à API
import { HttpErrorResponse } from '@angular/common/http'; // tipagem de erro HTTP
import type { Aluno } from '../../services/aluno.service.js'; // modelo do Aluno

@Component({
  selector: 'app-novo-aluno',                 // seletor do componente
  standalone: true,                           // standalone (sem NgModule)
  imports: [CommonModule, ReactiveFormsModule],// módulos usados no template
  templateUrl: './novo-aluno.html',           // template da página
  styleUrls: ['./novo-aluno.scss']            // estilos locais
})
export class NovoAlunoComponent {
  alunoForm: FormGroup;                       // form reativo

  fotoSelecionada: string | ArrayBuffer | null = null; // preview base64
  arquivoFoto: File | null = null;                     // arquivo escolhido
  erroFoto: string | null = null;                      // validação da foto

  salvando: boolean = false;                 // flag de envio
  mensagemErro: string | null = null;        // erro de cadastro

  constructor(
    private fb: FormBuilder,                 // construtor de forms
    private router: Router,                  // navegação
    private cdr: ChangeDetectorRef,          // força atualização da UI
    private alunoService: AlunoService       // service da API
  ) {

    // Define o form e validações
    this.alunoForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]], // obrigatório, min 3
      email: ['', [Validators.required, Validators.email]],               // email válido
      cpf: ['', [Validators.required]],                                   // obrigatório (mascarado)
      telefone: ['', [Validators.required]]                               // obrigatório (mascarado)
    });
  }

  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;       // campo de entrada
    let cpf = input.value.replace(/\D/g, '').slice(0, 11);// só dígitos, máx 11

    // Aplica máscara progressiva: 000.000.000-00
    if (cpf.length >= 3) cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    if (cpf.length >= 6) cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    if (cpf.length >= 9) cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2');

    input.value = cpf;                                    // reflete no input
    this.alunoForm.patchValue({ cpf }, { emitEvent: false }); // atualiza form sem loop
  }

  async onEscolherFoto(event: Event) {
    const input = event.target as HTMLInputElement;       // input file
    const arquivo = input.files && input.files[0] ? input.files[0] : null; // primeiro arquivo

    this.erroFoto = null;                                 // limpa erro anterior
    if (!arquivo) return;                                 // nada selecionado

    const isJpg = /jpe?g$/i.test(arquivo.name) || arquivo.type === 'image/jpeg'; // valida extensão/tipo
    if (!isJpg) {
      this.erroFoto = 'A foto precisa ser JPG (.jpg ou .jpeg).'; // erro de tipo
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {                 // > 2MB
      this.erroFoto = 'A foto não pode ultrapassar 2 MB.'; // erro de tamanho
      return;
    }

    this.arquivoFoto = arquivo;                           // guarda arquivo
    this.fotoSelecionada = await this.fileToBase64(arquivo); // gera base64 (preview/envio)
    this.cdr.detectChanges();                             // atualiza preview
  }

  async fileToBase64(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();              // lê binário
    const bytes = new Uint8Array(buffer);                 // array de bytes

    let binary = '';
    bytes.forEach(byte => binary += String.fromCharCode(byte)); // monta string binária

    return 'data:' + file.type + ';base64,' + btoa(binary);     // data URL base64
  }

  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;       // campo telefone
    let valor = input.value.replace(/\D/g, '').slice(0, 11); // só números, máx 11

    if (valor.length <= 11) {
      // Máscara (DD) 9xxxx-xxxx
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
      input.value = valor;                                // reflete no input
      this.alunoForm.patchValue({ telefone: valor }, { emitEvent: false }); // atualiza form
    }
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);                    // volta à listagem
  }

  cadastrar(): void {
    // Bloqueia se form inválido ou foto inválida
    if (!this.alunoForm.valid || this.erroFoto) {
      this.marcarCamposComoTocados();                    // mostra validações
      return;
    }

    this.salvando = true;                                // inicia envio
    this.mensagemErro = null;                            // limpa erro

    // Monta o payload conforme o modelo
    const novoAluno: Aluno = {
      nome: this.alunoForm.value.nomeCompleto,
      email: this.alunoForm.value.email,
      cpf: this.alunoForm.value.cpf,
      telefone: this.alunoForm.value.telefone,
      foto: this.fotoSelecionada as string,              // base64 (ou URL)

      status: "Ativo",                                   // padrão inicial
      matricula: this.gerarMatricula(),                  // gera matrícula única
      ativo: true                                        // flag booleana
    };

    // Chama API para criar
    this.alunoService.criar(novoAluno).subscribe({
      next: (alunoCriado: Aluno) => {
        console.log('Aluno cadastrado com sucesso:', alunoCriado); // log sucesso
        this.salvando = false;                     // finaliza envio
        this.router.navigate(['/alunos']);         // redireciona
      },
      error: (erro: HttpErrorResponse) => {
        console.error('Erro ao cadastrar aluno:', erro); // log erro
        this.mensagemErro = 'Erro ao cadastrar aluno. Tente novamente.'; // feedback
        this.salvando = false;                 // finaliza envio
        this.cdr.detectChanges();              // reflete mensagem na UI
      }
    });
  }

  private marcarCamposComoTocados(): void {
    // Marca campos para exibir mensagens de validação
    Object.keys(this.alunoForm.controls).forEach(campo => {
      this.alunoForm.get(campo)?.markAsTouched();
    });
  }

  private gerarMatricula(): string {
    // AAAAMMDD + 4 dígitos aleatórios
    const agora = new Date();
    return (
      agora.getFullYear().toString() +
      (agora.getMonth() + 1).toString().padStart(2, '0') +
      agora.getDate().toString().padStart(2, '0') +
      Math.floor(Math.random() * 9000 + 1000).toString()
    );
  }

  // Getters práticos para template
  get nomeCompleto() { return this.alunoForm.get('nomeCompleto'); }
  get email() { return this.alunoForm.get('email'); }
  get cpf() { return this.alunoForm.get('cpf'); }
  get telefone() { return this.alunoForm.get('telefone'); }

  get formularioValido(): boolean {
    return this.alunoForm.valid && !this.erroFoto; // forma resumida de checagem
  }
}
