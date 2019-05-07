
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './navigation/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ItemCartModule } from './navigation/item-cart/item-cart.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    ItemCartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
