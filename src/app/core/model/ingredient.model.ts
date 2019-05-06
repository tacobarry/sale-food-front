export class Ingredient {

  constructor(
// tslint:disable-next-line: variable-name
    private _id: number,
// tslint:disable-next-line: variable-name
    private _name: string,
// tslint:disable-next-line: variable-name
    private _value: number
  ) {
    this._id = _id || 0;
    this._name = _name || '';
    this._value = _value || 0;
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
    return this._value;
  }
}
