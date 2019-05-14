import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../../core/model/item-cart.model';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../core/services/purchase.service';
import { ItemCartService } from '../../../core/services/item-cart.service';
import { Purchase } from '../../../core/model/purchase.model';
import { Discount } from '../../../core/components/utils/discount';
import { Sandwich } from '../../../core/model/sandwich.model';

@Component({
  selector: 'app-new',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss'],
  providers: [PurchaseService, ItemCartService]
})
export class NewPurchaseComponent implements OnInit {
  private itemCart: ItemCart;
  private haveItensIntoCart = false;
  private itemcartArr: number[];
  private itemCarts: ItemCart[];
  private purchase: Purchase;
  private discount: Discount;

  private purchaseArr: number[];
  panelOpenState = true;

  amount: number;

  constructor(
    private itemCartService: ItemCartService,
    private purchaseService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initItemcartArr();
    this.receiveItemCartFromHistory();
    this.verifyItensIntoPurchase();
    this.retrieveAllItensFromStorage();
    this.initializeAmount();
    // console.log(this.itemCart);
  }

  private receiveItemCartFromHistory() {
    this.itemCart = history.state.itemCart;
  }

  private initPurchaseArr() {
    this.purchaseArr = JSON.parse(sessionStorage.getItem('purchaseIds'));
    // console.log(this.purchaseArr);
    if (this.purchaseArr === null) {
      this.purchaseArr = [];
    }
  }

  private initItemcartArr() {
    this.itemcartArr = JSON.parse(sessionStorage.getItem('itemCartArr'));
    if (this.itemcartArr === null) {
      this.itemcartArr = [];
    }
  }

  private initializeItemCarts() {
    if (this.itemCart !== undefined) {
      if (this.itemCarts === undefined) {
        this.itemCarts = [];
      }
      this.itemCarts.push(this.itemCart);
    }
  }

  private initializeAmount() {
    this.amount = 0;
    if (this.itemCarts !== undefined) {
      this.itemCarts.forEach((item) => {
        const discountForThisItem = this.calcDiscount(item.sandwich, item);
        this.amount += item.value - discountForThisItem;
      });
    }
  }

  retrieveAllItensFromStorage() {
    if (this.itemcartArr.length > 0) {
      this.itemCartService.getAllItemCarts()
        .then((itemcarts) => {
          this.itemCarts = itemcarts;
        })
        .then(() => {
          this.itemCarts = this.itemCarts.filter((elem) => {
            for (const id of this.itemcartArr) {
              if (elem.id === id) {
                return elem;
              }
            }
          });
        })
        .then(() => {
          this.initializeItemCarts();
          this.initializeAmount();
        });
    } else {
      this.initializeItemCarts();
    }
  }

  endPurchase() {
    this.initPurchaseArr();
    if (this.itemCart !== undefined) {
      this.itemcartArr.push(this.itemCart.id);
    }
    this.purchaseService.createNewPurchase({ where: null, itemcartArr: this.itemcartArr })
      .then((response: Purchase) => {
        // console.log('compra efetuada com sucesso!', response);
        // tslint:disable-next-line: align
        if (response.id !== undefined) {
          this.purchase = response;
          this.purchaseArr.push(response.id);
        }
        sessionStorage.setItem('purchaseIds', JSON.stringify(this.purchaseArr));
        sessionStorage.setItem('itemCartArr', JSON.stringify([]));
      })
      .then(() => {
        // console.log(this.purchase);
        this.router.navigate(['/compra-finalizada'], { state: { purchase: this.purchase } });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  keepBuying() {
    if (this.haveItensIntoCart) {
      if (this.itemCart !== undefined) {
        this.itemcartArr.push(this.itemCart.id);
      }
      sessionStorage.setItem('itemCartArr', JSON.stringify(this.itemcartArr));
    }
    this.router.navigate(['/produtos']);
  }

  private verifyItensIntoPurchase() {
    this.verifyHaveItemCartFromHistory();
    this.verifyHaveItensIntoStorage();
  }

  private verifyHaveItemCartFromHistory() {
    if (this.itemCart !== undefined) {
      this.haveItensIntoCart = true;
    }
  }

  private verifyHaveItensIntoStorage() {
    if (this.itemcartArr !== null && this.itemcartArr.length > 0) {
      this.haveItensIntoCart = true;
    }
  }

  private calcDiscount(product: Sandwich, itemCart: ItemCart) {
    this.discount = new Discount(product, itemCart);
    return this.discount.discount();
  }

  private reload() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(this.router.url).then(() => {
      this.router.onSameUrlNavigation = 'ignore';
    });
  }

  removeItemCart(id: number) {
    this.itemCartService.deleteItemCart(id);
    if (this.itemcartArr !== null && this.itemcartArr.length > 0) {
      this.itemcartArr = this.itemcartArr.filter((elem) => elem !== id );
    }
    sessionStorage.setItem('itemCartArr', JSON.stringify(this.itemcartArr));
    window.location.reload();
  }
}
