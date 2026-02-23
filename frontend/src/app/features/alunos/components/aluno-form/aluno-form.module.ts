import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlunoFormComponent } from './aluno-form';

import { PhotoUploadModule } from '../../../../shared/components/photo-upload/photo-upload.module';
import { ModalModule } from '../../../../shared/components/modal/modal.module';


import { CpfMaskModule } from '../../../../shared/directives/cpf-mask/cpf-mask.module';
import { PhoneMaskModule } from '../../../../shared/directives/phone-mask/phone-mask.module';

@NgModule({
  declarations: [
    AlunoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhotoUploadModule,
    ModalModule,
    CpfMaskModule,
    PhoneMaskModule
  ],
  exports: [
    AlunoFormComponent
  ]
})
export class AlunoFormModule {}
