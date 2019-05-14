import { Sandwich } from '../../model/sandwich.model';
import { Ingredient } from '../../model/ingredient.model';
import { IngredientEnum } from '../../enum/ingredient-enum.enum';
import { ItemCart } from '../../model/item-cart.model';

const QUANTITY_OF_CHEESE_FOR_DISCOUNT = 3;
const QUANTITY_OF_HAMBURGUER_FOR_DISCOUNT = 3;
const DISCOUNT_OF_LIGHT = 0.1;

export class Discount {
  private product: Sandwich;
  private itemCart: ItemCart;

  constructor(product: Sandwich, itemCart: ItemCart) {
    this.product = product;
    this.itemCart = itemCart;
  }

  public discount() {
    return this.calcDiscount(this.product, this.itemCart.aditionalList);
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
