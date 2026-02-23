import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetalhesDoAlunoComponent } from './aluno-details';

// Importe os módulos dos seus componentes compartilhados
import { PageHeaderModule } from '../../../../shared/components/page-header/page-header.module';
import { PhotoDisplayModule } from '../../../../shared/components/photo-display/photo-display.module';
import { FormFieldModule } from '../../../../shared/components/form-field/form-field.module';
import { StatusBadgeModule } from '../../../../shared/components/status-badge/status-badge.module';

@NgModule({
  declarations: [
    DetalhesDoAlunoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderModule,
    PhotoDisplayModule,
    FormFieldModule,
    StatusBadgeModule
  ]
})
export class DetalhesDoAlunoModule {}
