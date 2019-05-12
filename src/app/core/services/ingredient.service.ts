import { Injectable } from '@angular/core';
import { URL_API } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllIngredients(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get(`${URL_API}/ingredients`, {
      headers,
      responseType: 'json',
      observe: 'response'
    })
      .toPromise()
      .then((response) => response.body)
      .catch((err: any) => console.log(err));
  }
}
