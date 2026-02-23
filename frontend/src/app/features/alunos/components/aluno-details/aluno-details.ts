import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-details',
  templateUrl: './aluno-details.html',
  styleUrls: ['./aluno-details.scss']
})
export class DetalhesDoAlunoComponent implements OnInit {
  aluno: Aluno | null = null;
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.erro = 'ID do aluno não informado.';
      return;
    }

    const idNum = Number(idParam);

    if (isNaN(idNum)) {
      this.erro = 'ID inválido.';
      return;
    }

    this.carregarAluno(idNum);
  }

  carregarAluno(id: number) {
    this.carregando = true;
    this.erro = '';
    this.cdr.detectChanges();

    this.alunoService.buscarPorId(id).subscribe(
      (aluno: Aluno) => {
        this.aluno = aluno;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      (erro) => {
        this.erro = 'Aluno não encontrado.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    );
  }

  voltarParaLista() {
    this.router.navigate(['/alunos']);
  }
}
