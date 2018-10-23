import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {JwtService} from './jwt.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {
  }

  private setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    if (this.jwtService.getToken()) {
      const token = `Token ${this.jwtService.getToken()}`;
      headers.set('Authorization', token);
    }
    return headers;
  }

  private formatErrors(error: any) {
    return Observable.throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), params: params})
      .catch(this.formatErrors);
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`, body,
      {headers: this.setHeaders()}
    ).catch(this.formatErrors);
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`, body,
      {headers: this.setHeaders()}
    )
      .catch(this.formatErrors);
  }

  delete(path): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.delete(
      `${environment.api_url}${path}`,
      {headers: this.setHeaders()}
    )
      .catch(this.formatErrors);
  }
}
