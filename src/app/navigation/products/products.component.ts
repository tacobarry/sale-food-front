import { Component, OnInit } from '@angular/core';
import { Sandwich } from '../../core/model/sandwich.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SandwichService } from '../../core/services/sandwich.service';
import { SandwichEnum } from '../../core/enum/sandwich-enum.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ SandwichService ]
})
export class ProductsComponent implements OnInit {
  public products: Sandwich[];
  panelOpenState = false;

  constructor(
    private sandwichService: SandwichService
  ) { }

  public formulario: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required
    ])),
    age: new FormControl('', Validators.compose([
      Validators.required
    ]))
  }, { updateOn: 'blur' });

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
          response.forEach(element => {
            this.setImageUrl(element);
            // console.log(element);
            this.products.push(element);
          });
          // console.log('prod:', this.products);
        }
      });
  }

  private setImageUrl(product: Sandwich) {
    switch (product.name) {
      case SandwichEnum.X_BACON_NAME: {
        product.imageUrl = SandwichEnum.X_BACON;
        break;
      }
      case SandwichEnum.X_EGG_NAME: {
        product.imageUrl = SandwichEnum.X_EGG;
        break;
      }
      case SandwichEnum.X_BURGUER_NAME: {
        product.imageUrl = SandwichEnum.X_BURGUER;
        break;
      }
      case SandwichEnum.X_EGG_BACON_NAME: {
        product.imageUrl = SandwichEnum.X_EGG_BACON;
        break;
      }
    }
  }

}
