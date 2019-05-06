import { Component, OnInit } from '@angular/core';
import { Sandwich } from 'src/app/core/model/sandwich.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SandwichService } from '../../core/services/sandwich.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  providers: [ SandwichService ]
})
export class ProductsComponent implements OnInit {
  public products: Sandwich[];

  constructor(
    private sandwichService: SandwichService
  ) { }

  ngOnInit() {
    this.getAllSandwichesFromService();
  }

  getAllSandwichesFromService() {
    this.sandwichService.getAllSandwiches()
      .then((response: any) => {
        // console.log('prod:', response);

        if (response !== null) {
          if (this.products === undefined) {
            this.products = [];
          }
          // console.log('entrou:', this.products);
          const test: Sandwich[] = response;
          test.forEach(element => {
            this.products.push(element);
          });
          // console.log('prod:', this.products);
        }
      });
  }

}
