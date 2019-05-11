import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { PurchaseRoutingModule } from './purchase.routing.module';

import { NewPurchaseComponent } from './new-purchase/new-purchase.component';

@NgModule({
  declarations: [NewPurchaseComponent],
  imports: [
    CommonModule,
    CoreModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
