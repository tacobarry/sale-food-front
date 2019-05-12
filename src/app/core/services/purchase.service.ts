import { Injectable } from '@angular/core';
import { URL_API } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  createNewPurchase(config: { where: string, itemcartArr: number[] }) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      where: `${config.where}`,
      delivered: false,
      itemCartArr: config.itemcartArr
    };

    return this.http.post(`${URL_API}/purchase`,
      body,
    {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response.body)
      .catch((err: any) => console.log(err));
  }

  constructor(
    private http: HttpClient
  ) { }

  public getAllItemPurchases() {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${URL_API}/purchases`, {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((resposta) => resposta)
      .catch((err: any) => console.log(err));
  }
}
