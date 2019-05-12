import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import { FinalizedComponent } from '../finalized/finalized.component';

const purchaseRoutes: Routes = [
  { path: 'compra', component: NewPurchaseComponent,
    children: [
      { path: 'nova', component: NewPurchaseComponent }
    ]
  },
  { path: 'compra-finalizada', component: FinalizedComponent }

];

@NgModule({
  imports: [RouterModule.forChild(purchaseRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
