import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { PurchaseModule } from '../purchase/purchase.module';
import { ItemCartRoutingModule } from './item-cart-routing.module';

import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    CoreModule,
    ItemCartRoutingModule,
    PurchaseModule
  ],
  exports: []
})
export class ItemCartModule { }
