import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './navigation/products/products.component';
import { NewComponent } from './navigation/item-cart/new/new.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'item-da-compra/novo', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
