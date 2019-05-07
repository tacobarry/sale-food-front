import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Purchase } from '../../model/purchase.model';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuIcon = {};
    this.menuIcon.name = 'menu';
    this.checkRoute(this.activatedRoute);
  }

  ngDoCheck() {
    this.checkRoute(this.activatedRoute);
  }

  private checkRoute(route: ActivatedRoute) {
    // console.log(route.url.value[0].path);
    if (route.url['value'] !== undefined) {
      switch (route.url['value'][0].path) {
        case '/produtos': {
          this.route.title = 'Produtos';
          break;
        }
        case '/carrinho': {
          this.route.title = 'Carrinho';
          break;
        }
        case '/item': {
          this.route.title = 'Item do Pedido';
          break;
        }
        default : {
          this.route.title = 'Produtos';
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
