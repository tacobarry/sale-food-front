import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';

const itemCartRoutes: Routes = [
  { path: 'item-da-compra', /*redirectTo: 'item-da-compra/novo', pathMatch: 'full'*/ component: NewComponent,
    children: [
      { path: 'novo', component: NewComponent }
    ]
  },
  // { path: 'novo', component: NewComponent }
  // { path: 'item-da-compra/novo', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(itemCartRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class ItemCartRoutingModule { }
