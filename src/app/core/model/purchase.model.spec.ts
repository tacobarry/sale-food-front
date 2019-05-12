import { Purchase } from './purchase.model';
import { ItemCart } from './item-cart.model';
import { Sandwich } from './sandwich.model';
import { Ingredient } from './ingredient.model';
import { IngredientEnum } from '../enum/ingredient-enum.enum';

describe('Purchase', () => {
  it('should create an instance', () => {
    expect(
      new Purchase(
        0,
        10,
        'mesa 4',
        new Date(Date.now()),
        false,
        false,
        [new ItemCart(
          0,
          'x-bacon',
          10,
          'sem queijo',
          new Sandwich(
            11,
            'x-bacon',
            10,
            [new Ingredient(IngredientEnum.BACON, IngredientEnum.BACON_NAME, 3)],
            null
          ),
          []
        )]
      )
    ).toBeTruthy();
  });
});
