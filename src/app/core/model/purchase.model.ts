import { ItemCart } from './item-cart.model';

export class Purchase {

  constructor(
// tslint:disable-next-line: variable-name
    private _id: number,
// tslint:disable-next-line: variable-name
    private _value: number,
// tslint:disable-next-line: variable-name
    private _where: string,
// tslint:disable-next-line: variable-name
    private _date: Date,
// tslint:disable-next-line: variable-name
    private _makePurchase: boolean,
// tslint:disable-next-line: variable-name
    private _delivered: boolean,
// tslint:disable-next-line: variable-name
    private _itemcartList: ItemCart[]
  ) {
    this._id = _id;
    this._value = _value;
    this._where = _where;
    this._date = _date;
    this._makePurchase = _makePurchase;
    this._delivered = _delivered;
    this._itemcartList = _itemcartList;
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  set value(value: number) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set where(where: string) {
    this._where = where;
  }

  get where(): string {
    return this._where;
  }

  set date(date: Date) {
    this._date = date;
  }

  get date(): Date {
    return this._date;
  }

  set makePurchase(done: boolean) {
    this._makePurchase = done;
  }

  get makePurchase(): boolean {
    return this._makePurchase;
  }

  set delivered(delivered: boolean) {
    this._delivered = delivered;
  }

  get delivered(): boolean {
    return this._delivered;
  }

  set itemCartList(itemCartList: ItemCart[]) {
    this._itemcartList = itemCartList;
  }

  get itemCartList(): ItemCart[] {
    return this._itemcartList;
  }
}
