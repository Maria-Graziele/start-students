import { type Routes } from '@angular/router';
import { TelaDeLoginComponent } from './features/auth/pages/login/tela-de-login';
import { AlunosComponent } from './features/alunos/components/aluno-list/aluno-list';
import { NovoAlunoPage } from './features/alunos/pages/novo-aluno/novo-aluno.page';
import { DetalhesDoAlunoComponent } from './features/alunos/components/aluno-details/aluno-details';
import { EditarAlunoPage } from './features/alunos/pages/editar-aluno/editar-aluno.page';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'alunos/novo', component: NovoAlunoPage },
  { path: 'alunos/editar/:id', component: EditarAlunoPage },
  { path: 'alunos/:id', component: DetalhesDoAlunoComponent }
];
