import { Component, OnInit } from '@angular/core';
import { Sandwich } from 'src/app/core/model/sandwich.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SandwichService } from 'src/app/core/services/sandwich.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  providers: [ SandwichService ]
})
export class ProductsComponent implements OnInit {
  public products: Object[];

  constructor(
    private sandwichService: SandwichService
  ) { }

  ngOnInit() {
    this.sandwichService.getAllSandwiches()
      .then((obj) => {
        if (!!obj) {
          if (obj.hasOwnProperty['body']) {
            this.products.push(obj['body']);
          }
        }
      });
  }

}
