import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, ActivatedRouteSnapshot, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Sandwich } from '../../../core/model/sandwich.model';
import { ItemCartService } from '../../../core/services/item-cart.service';
import { ItemCart } from '../../../core/model/item-cart.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  state$: Observable<object>;

  private product: Sandwich;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemCartService: ItemCartService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav.extras.state.product;
    console.log(this.product);
  }

  ngOnInit() {
    console.log('entrou', this.activatedRoute, window.history.state);
    let itemCart = new ItemCart(null, this.product.name, null, null, this.product, []);

    // this.itemCartService.createNewItemCart(itemCart)
    //   .then((resp) => {
    //     itemCart = resp;
    //   });
    // console.log(itemCart);
    // let questoesParam = this.activatedRoute
    //   .queryParamMap
    //   .pipe(
    //     map(params => {
    //       console.log(params.get('product') || 'None');
    //       return params.get('product');
    //     })
    //   );
    //   console.log(this.activatedRoute.queryParamMap);

  }

}
