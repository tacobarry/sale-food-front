import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { ItemCartRoutingModule } from './item-cart-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    ItemCartRoutingModule
  ],
  exports: []
})
export class ItemCartModule { }
