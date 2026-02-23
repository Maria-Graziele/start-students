import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';
import { AppRoutingModule } from './app-routing.module';

import { AlunosComponent } from './features/alunos/components/aluno-list/aluno-list';
import { NovoAlunoPage } from './features/alunos/pages/novo-aluno/novo-aluno.page';
import { DetalhesDoAlunoComponent } from './features/alunos/components/aluno-details/aluno-details';
import { EditarAlunoPage } from './features/alunos/pages/editar-aluno/editar-aluno.page';

import { AlunoFormModule } from './features/alunos/components/aluno-form/aluno-form.module';

import { ModalModule } from './shared/components/modal/modal.module';
import { PaginationModule } from './shared/components/pagination/pagination.module';
import { SearchBarModule } from './shared/components/search-bar/search-bar.module';
import { PhotoUploadModule } from './shared/components/photo-upload/photo-upload.module';
import { StatusBadgeModule } from './shared/components/status-badge/status-badge.module';
import { PhotoDisplayModule } from './shared/components/photo-display/photo-display.module';
import { PageHeaderModule } from './shared/components/page-header/page-header.module';
import { LoadingSpinnerModule } from './shared/components/loading-spinner/loading-spinner.module';
import { FormFieldModule } from './shared/components/form-field/form-field.module';

import { CpfMaskModule } from './shared/directives/cpf-mask/cpf-mask.module';
import { PhoneMaskModule } from './shared/directives/phone-mask/phone-mask.module';

import { FormatPipesModule } from './shared/pipes/format-pipes.module';

import { TelaDeLoginModule } from './features/auth/pages/login/tela-de-login.module';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    NovoAlunoPage,
    DetalhesDoAlunoComponent,
    EditarAlunoPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoFormModule,
    ModalModule,
    PaginationModule,
    SearchBarModule,
    PhotoUploadModule,
    StatusBadgeModule,
    PhotoDisplayModule,
    PageHeaderModule,
    LoadingSpinnerModule,
    FormFieldModule,
    CpfMaskModule,
    PhoneMaskModule,
    FormatPipesModule,
    TelaDeLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
