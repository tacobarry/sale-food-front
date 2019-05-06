import { Injectable } from '@angular/core';
import { URL_API } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SandwichService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllSandwiches(): Promise<any> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${URL_API}/sandwiches`, {
      headers: header,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((resposta) => resposta.body)
      .catch(err => console.log(err));
  }
}
