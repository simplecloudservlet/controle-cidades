import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidade } from '../model/cidade';


@Injectable({
  providedIn: 'root'
})
export class CidadeObservableHttpJsonserverService {
  URL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  getByCidadeName(cidadename: string): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(`${this.URL}/${cidadename}`);
  }

  post(cidade: Cidade): Observable<Cidade> {
    return this.httpClient
      .post<Cidade>(this.URL+'/cidades', JSON.stringify(cidade), this.httpOptions);
  }
  //DELETE: Remove do db.json
  delete(cidade: Cidade): Observable<Cidade> {
    return this.httpClient
      .delete<Cidade>(this.URL+'/cidades/'+cidade.id, this.httpOptions);
  }

  patch(cidade: Cidade): Observable<Cidade> {
    return this.httpClient
      .patch<Cidade>(
        this.URL+'/cidades/'+cidade.id,
        JSON.stringify(cidade),
        this.httpOptions
      );
  }

  //PUT: Insere todos os campos novamente
  put(cidade: Cidade): Observable<Cidade> {
    return this.httpClient
      .put<Cidade>(
        `${this.URL}/${cidade.id}`,
        JSON.stringify(cidade),
        this.httpOptions
      );
  }
}
