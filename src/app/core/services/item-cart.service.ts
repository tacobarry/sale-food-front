import { Injectable } from '@angular/core';
import { URL_API } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCart } from '../model/item-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ItemCartService {
  constructor(
    private http: HttpClient
  ) { }

  public getAllItemCarts(): Promise<any> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${URL_API}/itemcarts`, {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response.body)
      .catch((err: any) => console.log(err));
  }

  public createNewItemCart(itemCart: ItemCart): Promise<any> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const ingredientArray: number[] = [];
    itemCart.aditionalList.forEach((item) => {
      ingredientArray.push(item.id);
    });

    const body = {
      productId: `${itemCart.sandwich.id}`,
      message: undefined,
      ingredientArray
    };
    if (!!itemCart.message) {
      body.message = `${itemCart.message}`;
    }

    // console.log(body);

    return this.http.post(`${URL_API}/itemcart`,
      body,
    {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response)
      .catch((err: any) => console.log(err));
  }

  public deleteItemCart(id: number) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${URL_API}/itemcart/${id}`,
    {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response)
      .catch((err) => console.log(err));
  }

}
