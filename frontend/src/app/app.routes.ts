import type { Routes } from '@angular/router';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login';
import { AlunosComponent } from './components/listagem-de-alunos/listagem-de-alunos';
import { NovoAlunoComponent } from './components/novo-aluno/novo-aluno'; // <-- sem .js
import { DetalhesDoAlunoComponent } from './components/detalhes-do-aluno/detalhes-do-aluno';
import { EditarAlunosComponent } from './components/editar-alunos/editar-alunos';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'novo-aluno', component: NovoAlunoComponent },
  { path: 'detalhes-aluno/:id', component: DetalhesDoAlunoComponent },
  { path: 'editar-alunos/:id', component: EditarAlunosComponent },
  { path: '**', redirectTo: 'login' },
];
