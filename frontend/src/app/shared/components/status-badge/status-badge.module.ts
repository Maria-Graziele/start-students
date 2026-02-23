import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusBadgeComponent } from './status-badge';

@NgModule({
  declarations: [
    StatusBadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusBadgeComponent
  ]
})
export class StatusBadgeModule { }
