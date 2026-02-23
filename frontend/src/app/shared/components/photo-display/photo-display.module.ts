import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoDisplayComponent } from './photo-display.component';

@NgModule({
  declarations: [
    PhotoDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhotoDisplayComponent
  ]
})
export class PhotoDisplayModule { }
