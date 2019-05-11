import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ItemCartRoutingModule } from './item-cart-routing.module';
import { NewComponent } from './new/new.component';
import { PurchaseModule } from '../purchase/purchase.module';

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
