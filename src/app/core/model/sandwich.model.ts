import { Ingredient } from './ingredient.model';

export class Sandwich {

  constructor(
    private _id: number,
    private _name: string,
    private _value: number,
    private _ingredients: Ingredient[],
    private _imageUrl: string
  ) {
    this._id = _id;
    this._name = _name;
    this._value = _value;
    this._ingredients = _ingredients;
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

  set ingredients(list: Ingredient[]) {
    this._ingredients = list;
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  public addIngredient(i: Ingredient) {
    this._ingredients.push(i);
  }

  // transient
  set imageUrl(url: string) {
    this._imageUrl = url;
  }

  // transient
  get imageUrl(): string {
    return this._imageUrl;
  }
}
