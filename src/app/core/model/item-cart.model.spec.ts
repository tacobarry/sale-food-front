import { ItemCart } from './item-cart.model';
import { Sandwich } from './sandwich.model';
import { Ingredient } from './ingredient.model';
import { IngredientEnum } from '../enum/ingredient-enum.enum';

describe('ItemCart', () => {
  it('should create an instance', () => {
    expect(
      new ItemCart(
        0,
        'x-bacon',
        7.5,
        'sem queijo',
        new Sandwich(11, 'x-bacon', 7.5, [new Ingredient(IngredientEnum.BACON, IngredientEnum.BACON_NAME, 3)]),
        [])
    ).toBeTruthy();
  });
});
