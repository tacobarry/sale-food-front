import { Ingredient } from './ingredient.model';
import { IngredientEnum } from '../enum/ingredient-enum.enum';

describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(new Ingredient(IngredientEnum.LETUCE, IngredientEnum.LETUCE_NAME, 0.3)).toBeTruthy();
  });
});
