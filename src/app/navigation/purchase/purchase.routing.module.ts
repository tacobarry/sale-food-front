import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';

const purchaseRoutes: Routes = [
  { path: 'compra', component: NewPurchaseComponent,
    children: [
      { path: 'nova', component: NewPurchaseComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(purchaseRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
