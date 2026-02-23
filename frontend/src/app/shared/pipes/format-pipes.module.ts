import { NgModule } from '@angular/core';

import { CpfPipe, PhonePipe } from './format-pipes';

@NgModule({
  declarations: [
    CpfPipe,
    PhonePipe
  ],
  exports: [
    CpfPipe,
    PhonePipe
  ]
})
export class FormatPipesModule { }
