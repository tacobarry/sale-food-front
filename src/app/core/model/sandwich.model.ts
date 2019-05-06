import { Ingredient } from './ingredient.model';

export class Sandwich {

  constructor(
    private _id: number,
    private _name: string,
    private _value: number,
    private _ingredientList: Ingredient[]
  ) {
    this._id = _id;
    this._name = _name;
    this._value = _value;
    this._ingredientList = _ingredientList;
  }

  set id(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set value(value: number) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set ingredientList(list: Ingredient[]) {
    this._ingredientList = list;
  }

  get ingredientList(): Ingredient[] {
    return this._ingredientList;
  }

  public addIngredient(i: Ingredient) {
    this._ingredientList.push(i);
  }
}
