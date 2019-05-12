import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { FinalizedRoutingModule } from './finalized-routing.module';

import { FinalizedComponent } from './finalized.component';

@NgModule({
  declarations: [FinalizedComponent],
  imports: [
    CommonModule,
    CoreModule,
    FinalizedRoutingModule
  ]
})
export class FinalizedModule { }
