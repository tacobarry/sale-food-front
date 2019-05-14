import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sandwich } from '../../../core/model/sandwich.model';
import { ItemCartService } from '../../../core/services/item-cart.service';
import { ItemCart } from '../../../core/model/item-cart.model';
import { Ingredient } from 'src/app/core/model/ingredient.model';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { Discount } from '../../../core/components/utils/discount';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [IngredientService, ItemCartService]
})
export class NewComponent implements OnInit {

  public ingredients: Ingredient[];
  public ingredientQuantity: number[];
  public itemCart: ItemCart;
  private product: Sandwich;
  private before: FormControl;
  private after: FormControl;
  private discountClass: Discount;

  constructor(
    private router: Router,
    private itemCartService: ItemCartService,
    private ingredientService: IngredientService
  ) {
    this.product = this.router.getCurrentNavigation().extras.state.product;

    const beforePosition: TooltipPosition = 'before';
    const afterPosition: TooltipPosition = 'after';
    this.before = new FormControl(beforePosition);
    this.after = new FormControl(afterPosition);
  }

  ngOnInit() {
    this.product = history.state.product;
    this.setIngredients();
    this.itemCart = new ItemCart(null, this.product.name, null, null, this.product, []);
  }

  setIngredients() {
    this.ingredients = [];
    this.ingredientService.getAllIngredients()
      .then((ingredients) => {
        this.ingredients = ingredients;
      })
      .then(() => {
        this.ingredientQuantity = [];
        this.ingredients.forEach((ingredient) => {
          this.ingredientQuantity[ingredient.id] = 0;
        });
      });
  }

  removeItem() {
    this.router.navigate(['/produtos']);
  }

  private getArrayOfIngredienteId(id: number) {
    const arr: number[] = [];
    for (let i = 0; i < this.ingredientQuantity[id]; i++) {
      arr.push(id);
    }
    return arr;
  }

  addItem() {
    const ingredientsArr = [];
    this.ingredients.forEach((item) => {
      ingredientsArr.push(...this.getArrayOfIngredienteId(item.id));
    });
    const newArrayOfIngredients = [];
    ingredientsArr.forEach((idOfIngredient) => {
      this.ingredients.forEach((ingredient) => {
        if (ingredient.id === idOfIngredient) {
          newArrayOfIngredients.push(ingredient);
        }
      });
    });
    this.itemCart.aditionalList = newArrayOfIngredients;
    this.itemCart.setDiscount(this.discount());

    this.itemCartService.createNewItemCart(this.itemCart)
      .then((resp) => {
        this.itemCart = resp.body;
      })
      .then(() => {
        this.router.navigate(['/compra/nova'], { state: { itemCart: this.itemCart } });
      });
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

  addIngredient(config: any) {
    const id = config.id;
    const ingredient = config.ingredient;
    if (this.ingredientQuantity[id.toString()] < 10) {
      const quantity = this.ingredientQuantity[id.toString()].valueOf() + 1;
      this.ingredientQuantity[id.toString()] = quantity;
      this.itemCart.addAditional(ingredient);
    }
  }

  removeIngredient(config: any) {
    const id = config.id;
    const ingredient = config.ingredient;
    if (this.ingredientQuantity[id.toString()] > 0) {
      const quantity = this.ingredientQuantity[id.toString()].valueOf() - 1;
      this.ingredientQuantity[id.toString()] = quantity;
      this.itemCart.removeAditional(ingredient);
    }
  }

  public discount() {
    this.discountClass = new Discount(this.product, this.itemCart);
    return this.discountClass.discount();
  }

}
