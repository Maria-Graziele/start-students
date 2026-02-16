import { Component, type OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService, type Aluno } from '../../services/aluno.service';

// Componentes reutilizáveis
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PhotoDisplayComponent } from '../../../../shared/components/photo-display/photo-display.component';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-aluno-details',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    PhotoDisplayComponent,
    FormFieldComponent,
    StatusBadgeComponent
  ],
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

    this.alunoService.buscarPorId(id).subscribe({
      next: (aluno: Aluno) => {
        this.aluno = aluno;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        this.erro = 'Aluno não encontrado.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  voltarParaLista() {
    this.router.navigate(['/alunos']);
  }
}
