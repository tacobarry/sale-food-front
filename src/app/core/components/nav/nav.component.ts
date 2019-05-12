import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, } from '@angular/core';
import { Purchase } from '../../model/purchase.model';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

  private countItemCartList: number;

  public menuIcon: any;
  public route: any = { title: '' };

  @Input() receiveClickNavbar: boolean;
  @Output() navBarOutput = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuIcon = {};
    this.menuIcon.name = 'menu';
    this.checkRoute(this.activatedRoute);
  }

  goto() {
    this.router.navigate(['/']);
  }

  gotoPurchase() {
    this.router.navigate(['/compra/novo']);
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngDoCheck() {
    this.checkRoute(this.activatedRoute);
  }

  private checkRoute(route: ActivatedRoute) {
    // console.log(route.url.value[0].path);
// tslint:disable-next-line: no-string-literal
    if (route.url['value'] !== undefined) {
// tslint:disable-next-line: no-string-literal
      switch (route.url['value'][0].path) {
        case '/produtos': {
          this.route.title = 'Produtos';
          break;
        }
        case '/carrinho': {
          this.route.title = 'Carrinho';
          break;
        }
        case '/item-da-compra': {
          this.route.title = 'Item do Pedido';
          break;
        }
        default : {
          this.route.title = 'Sale Food';
          break;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.receiveClickNavbar) {
      this.menuIcon = {};
      this.menuIcon.name = 'menu';
    }
  }

  toggleNavBar() {
    this.menuIcon.name = this.menuIcon.name === 'menu' ? 'close' : 'menu';
    this.navBarOutput.emit('clicked');
  }

}
