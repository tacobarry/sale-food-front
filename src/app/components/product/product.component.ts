import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Sandwich } from 'src/app/core/model/sandwich.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Sandwich;

  constructor() { }

  ngOnInit() {
  }

}
