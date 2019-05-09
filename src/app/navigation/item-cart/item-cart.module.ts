import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ItemCartRoutingModule } from './item-cart-routing.module';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    CoreModule,
    ItemCartRoutingModule
  ],
  exports: []
})
export class ItemCartModule { }
