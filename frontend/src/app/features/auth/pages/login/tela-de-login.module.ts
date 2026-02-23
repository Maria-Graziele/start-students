import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TelaDeLoginComponent } from './tela-de-login';

@NgModule({
  declarations: [
    TelaDeLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TelaDeLoginComponent
  ]
})
export class TelaDeLoginModule { }
