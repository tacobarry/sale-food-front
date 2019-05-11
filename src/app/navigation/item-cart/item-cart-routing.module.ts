import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { NewPurchaseComponent } from '../purchase/new-purchase/new-purchase.component';

const itemCartRoutes: Routes = [
  { path: 'item-da-compra', /*redirectTo: 'item-da-compra/novo', pathMatch: 'full'*/ component: NewComponent,
    children: [
      { path: 'novo', component: NewComponent }
    ]
  },
  { path: 'compra', component: NewPurchaseComponent,
    children: [
      { path: 'nova', component: NewPurchaseComponent }
    ]
  }
  // { path: 'novo', component: NewComponent }
  // { path: 'item-da-compra/novo', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(itemCartRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class ItemCartRoutingModule { }
