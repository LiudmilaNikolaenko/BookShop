import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { Book, Format, Country, City, Publisher, SearchParam } from './index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class BookService {
  private searchParams: SearchParam = new SearchParam("", "", "", "", "", "", "", "");

  private url = 'http://localhost:3004/';
  
  constructor(private http: Http) { }

  public getSearchParams(): SearchParam {
    return this.searchParams;
  }

  public updateSearchParams(newSearchParams: SearchParam) {
    this.searchParams = newSearchParams;
  }
  
  public getBooks(): Observable<Book[]> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'books', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getBook(id: number): Observable<Book> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'books/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addBook(book: Book) {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.post(this.url + 'books', book, options)
      .catch(this.handleError);
  }

  public searchBooks(): Observable<Response> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let myParams = new URLSearchParams();
    for (let key in this.searchParams) {
      if (this.searchParams[key]) 
        myParams.set(key, this.searchParams[key]);
    }
    let options = new RequestOptions({ headers: myHeaders, params: myParams });

    return this.http.get(this.url + 'books', options)
      .map(this.extractSearchData)
      .catch(this.handleError);
  }

  public getFormats(): Observable<Format[]> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'formats', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getFormat(id: number): Observable<Format> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'formats/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCountries(): Observable<Country[]> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'countries', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCountry(id: number): Observable<Country> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'countries/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCities(): Observable<City[]> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'cities', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCity(id: number): Observable<City> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'cities/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getPublishers(): Observable<Publisher[]> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'publishers', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getPublisher(id: number): Observable<Publisher> {
    let myHeaders = new Headers();
    myHeaders.set('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get(this.url + 'publishers/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private extractSearchData(res: Response) {
    return res;
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);
    return Observable.throw(message);
  }
}

