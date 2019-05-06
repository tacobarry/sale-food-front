import { Sandwich } from './sandwich.model';
import { Ingredient } from './ingredient.model';
import { IngredientEnum } from '../enum/ingredient-enum.enum';

describe('Sandwich', () => {
  it('should create an instance', () => {
    expect(new Sandwich(11, 'x-bacon', 7.5, [new Ingredient(IngredientEnum.BACON, IngredientEnum.BACON_NAME, 3)])).toBeTruthy();
  });
});
