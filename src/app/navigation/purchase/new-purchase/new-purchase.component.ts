import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/core/model/item-cart.model';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { ItemCartService } from 'src/app/core/services/item-cart.service';
import { Purchase } from 'src/app/core/model/purchase.model';

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

  private purchaseArr: number[];
  panelOpenState = true;

  constructor(
    private purchaseService: PurchaseService,
    private itemCartService: ItemCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initItemcartArr();
    this.receiveItemCartFromHistory();
    this.verifyItensIntoPurchase();
    this.retrieveAllItensFromStorage();
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

  retrieveAllItensFromStorage() {
    if (this.itemcartArr.length > 0) {
      this.itemCartService.getAllItemCarts()
        .then((itemcarts) => {
          this.itemCarts = itemcarts;
        })
        .then(() => {
          // console.log(this.itemCarts);
          this.itemCarts = this.itemCarts.filter((elem) => {
            // console.log(this.itemcartArr);
            for (let id of this.itemcartArr) {
              if (elem.id === id) {
                return elem;
              }
            }
          });
          // console.log(this.itemCarts);
        })
        .then(() => {
          if (this.itemCart !== undefined) {
            if (this.itemCarts === undefined) {
              this.itemCarts = [];
            }
            this.itemCarts.push(this.itemCart);
            // console.log('retrieveAllItensFromStorage', this.itemCarts);
          }
        });
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

}
