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

  getByCidadename(username: string): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(`${this.URL}/${username}`);
  }

  post(user: Cidade): Observable<Cidade> {
    return this.httpClient
      .post<Cidade>(this.URL+'/cidades', JSON.stringify(user), this.httpOptions);
  }
  //DELETE: Remove do db.json
  delete(user: Cidade): Observable<Cidade> {
    return this.httpClient
      .delete<Cidade>(this.URL+'/cidades/'+user.id, this.httpOptions);
  }

  patch(user: Cidade): Observable<Cidade> {
    return this.httpClient
      .patch<Cidade>(
        this.URL+'/cidades/'+user.id,
        JSON.stringify(user),
        this.httpOptions
      );
  }

  //PUT: Insere todos os campos novamente
  put(user: Cidade): Observable<Cidade> {
    return this.httpClient
      .put<Cidade>(
        `${this.URL}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      );
  }
}
