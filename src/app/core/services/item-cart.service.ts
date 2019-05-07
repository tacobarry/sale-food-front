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
      .then((response) => response)
      .catch((err: any) => console.log(err));
  }

  public createNewItemCart(itemCart: ItemCart): Promise<any> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${URL_API}/itemcart`,
      JSON.stringify(itemCart),
    {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response)
      .catch((err: any) => console.log(err));
  }

}
