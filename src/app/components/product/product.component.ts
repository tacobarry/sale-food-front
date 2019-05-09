import { Component, OnInit, Input } from '@angular/core';
import { Sandwich } from '../../core/model/sandwich.model';
import { ItemCartService } from '../../core/services/item-cart.service';
import { ItemCart } from '../../core/model/item-cart.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ ItemCartService ]
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Sandwich;

  constructor(
    private itemCartservice: ItemCartService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.product);
  }

  addProduct(product: Sandwich) {
    this.router.navigate(['item-da-compra/novo'], { state: { product } });

    // let itemCart = new ItemCart(null, product.name, null, null, product, []);

    // this.itemCartservice.createNewItemCart(itemCart)
    //   .then((resp) => {
    //     itemCart = resp;
    //   });
  }

}
