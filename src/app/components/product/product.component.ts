import { Component, OnInit, Input } from '@angular/core';
import { Sandwich } from 'src/app/core/model/sandwich.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Sandwich;

  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }

  addProduct(id: Number) {
    console.log('ID:', id);
  }

}
