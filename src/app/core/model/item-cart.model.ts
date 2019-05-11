import { Sandwich } from './sandwich.model';
import { Ingredient } from './ingredient.model';

export class ItemCart {

constructor(
// tslint:disable-next-line: variable-name
    private _id: number,
// tslint:disable-next-line: variable-name
    private _name: string,
// tslint:disable-next-line: variable-name
    private _value: number,
// tslint:disable-next-line: variable-name
    private _message: string,
// tslint:disable-next-line: variable-name
    private _sandwich: Sandwich,
// tslint:disable-next-line: variable-name
    private _aditionalList: Ingredient[]
  ) {
    this._id = _id || 0;
    this._name = _name || '';
    this._value = _value || 0;
    this._aditionalList = _aditionalList || [];
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
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
    this._value = this._sandwich.value;
    this._aditionalList.forEach((elem) => {
      this._value += elem.value;
    });
    return this._value;
  }

  set message(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }

  set sandwich(sandwich: Sandwich)  {
    this._sandwich = sandwich;
  }

  get sandwich(): Sandwich {
    return this._sandwich;
  }

  set aditionalList(list: Ingredient[]) {
    this._aditionalList = list;
  }

  get aditionalList(): Ingredient[] {
    return this._aditionalList;
  }

  public addAditional(i: Ingredient) {
    this._aditionalList.push(i);
  }

  public removeAditional(i: Ingredient) {
    let list: Ingredient[] = [];
    let findElem = false;
    let countElem = 0;
    console.log(this._aditionalList);
    this._aditionalList.forEach((elem) => {
      list.push(elem);
      if (elem.id === i.id) {
        countElem++;
        findElem = true;
      }
      if (findElem && countElem === 1) {
        list.pop();
      }
    });
    this._aditionalList = list;
    console.log(this._aditionalList);
  }
}
