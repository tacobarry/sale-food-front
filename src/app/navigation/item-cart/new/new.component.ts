import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, ActivatedRouteSnapshot, Params, Navigation } from '@angular/router';
import { Sandwich } from '../../../core/model/sandwich.model';
import { ItemCartService } from '../../../core/services/item-cart.service';
import { ItemCart } from '../../../core/model/item-cart.model';
import { Ingredient } from 'src/app/core/model/ingredient.model';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { IngredientEnum } from 'src/app/core/enum/ingredient-enum.enum';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';


const QUANTITY_OF_CHEESE_FOR_DISCOUNT = 3;
const QUANTITY_OF_HAMBURGUER_FOR_DISCOUNT = 3;
const DISCOUNT_OF_LIGHT = 0.1;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemCartService: ItemCartService,
    private ingredientService: IngredientService
  ) {
    this.product = this.router.getCurrentNavigation().extras.state.product;

    const beforePosition: TooltipPosition = 'before';
    const afterPosition: TooltipPosition = 'after';
    this.before = new FormControl(beforePosition);
    this.after = new FormControl(afterPosition);
    // console.log(this.product);
  }

  ngOnInit() {
    // console.log(history.state.product);
    this.product = history.state.product;
    // this.product = this.nav.extras.state.product;
    this.setIngredients();
    // console.log('entrou', this.activatedRoute, window.history.state);
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
        // console.log(this.ingredientQuantity);
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
    // console.log('addItem');
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
    // console.log(newArrayOfIngredients);
    this.itemCart.aditionalList = newArrayOfIngredients;
    this.itemCart.setDiscount(this.discount());

    // console.log(this.ingredientQuantity, ingredientsArr);

    // console.log(this.itemCart);
    // const body = {
    //   productId: `${this.itemCart.sandwich.id}`,
    //   message: undefined,
    //   ingredientsArr
    // };
    // if (!!this.itemCart.message) {
    //   body.message = `${this.itemCart.message}`;
    // }

    this.itemCartService.createNewItemCart(this.itemCart)
      .then((resp) => {
        this.itemCart = resp.body;
        // console.log(this.itemCart);
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
    // console.log(this.ingredientQuantity[id.toString()] < 10);
    if (this.ingredientQuantity[id.toString()] < 10) {
      // console.log('entrou');
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
    // console.log(this.product.ingredients, this.itemCart.aditionalList);
    return this.calcDiscount(this.product, this.itemCart.aditionalList);
    // return 0;
  }

  private calcDiscount(sandwich: Sandwich, ingredients: Ingredient[]) {
    const muchMeatDiscount = this.muchMeat(sandwich, ingredients);
    const muchCheeseDiscount = this.muchCheese(sandwich, ingredients);
    const lightDiscount = this.light(sandwich, ingredients);
    return muchMeatDiscount + muchCheeseDiscount + lightDiscount;
  }

  private muchMeat(sandwich: Sandwich, ingredients: Ingredient[]) {
    let countHamburguer = 0;
    let hambuerguer: Ingredient;
    if (sandwich === undefined) {
      return 0;
    } else {
      if (sandwich.ingredients === undefined) {
        return 0;
      }
    }
    if (ingredients === undefined) {
      return 0;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ingredients.length; i++) {
      if (IngredientEnum.HAMBURGUER === ingredients[i].id) {
        countHamburguer++;
        hambuerguer = ingredients[i];
      }
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sandwich.ingredients.length; i++) {
      if (IngredientEnum.HAMBURGUER === sandwich.ingredients[i].id) {
        countHamburguer++;
        hambuerguer = sandwich.ingredients[i];
      }
    }
    if (countHamburguer > 0) {
      if (countHamburguer % QUANTITY_OF_HAMBURGUER_FOR_DISCOUNT === 0) {
        // console.log(hambuerguer.value, countHamburguer, Math.floor( countHamburguer / QUANTITY_OF_HAMBURGUER_FOR_DISCOUNT ));
      }
      return hambuerguer.value * Math.floor(countHamburguer / QUANTITY_OF_HAMBURGUER_FOR_DISCOUNT);
    }
    return 0;
  }

  private muchCheese(sandwich: Sandwich, ingredients: Ingredient[]) {
    let countCheese = 0;
    let cheese: Ingredient;
    if (sandwich === undefined) {
      return 0;
    } else {
      if (sandwich.ingredients === undefined) {
        return 0;
      }
    }
    if (ingredients === undefined) {
      return 0;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ingredients.length; i++) {
      if (IngredientEnum.CHEESE === ingredients[i].id) {
        countCheese++;
        cheese = ingredients[i];
      }
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sandwich.ingredients.length; i++) {
      if (IngredientEnum.CHEESE === sandwich.ingredients[i].id) {
        countCheese++;
        cheese = sandwich.ingredients[i];
      }
    }
    if (countCheese > 0) {
      return cheese.value * Math.floor(countCheese / QUANTITY_OF_CHEESE_FOR_DISCOUNT);
    }
    return 0;
  }

  private light(sandwich: Sandwich, ingredients: Ingredient[]) {
    let haveLetuce: boolean = false;
    let haveBacon: boolean = false;
    if (sandwich === undefined) {
      return 0;
    } else {
      if (sandwich.ingredients === undefined) {
        return 0;
      }
    }
    if (ingredients === undefined) {
      return 0;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ingredients.length; i++) {
      if (!haveLetuce) {
        haveLetuce = IngredientEnum.LETUCE === ingredients[i].id;
      }
      if (!haveBacon) {
        haveBacon = IngredientEnum.BACON === ingredients[i].id;
      } else {
        break;
      }
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sandwich.ingredients.length; i++) {
      if (!haveLetuce) {
        haveLetuce = IngredientEnum.LETUCE === sandwich.ingredients[i].id;
      }
      if (!haveBacon) {
        haveBacon = IngredientEnum.BACON === sandwich.ingredients[i].id;
      } else {
        break;
      }
    }
    if (haveLetuce && !haveBacon) {
      return this.itemCart.value * DISCOUNT_OF_LIGHT;
    }
    return 0;
  }

}
