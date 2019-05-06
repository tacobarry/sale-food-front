import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Purchase } from '../../model/purchase.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit, OnChanges {

  private countItemCartList: number;

  public menuIcon: any;

  @Input() receiveClickNavbar: boolean;
  @Output() navBarOutput = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.menuIcon = {};
    this.menuIcon.name = 'menu';
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
