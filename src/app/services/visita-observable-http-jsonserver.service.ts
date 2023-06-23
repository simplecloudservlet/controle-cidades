import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Visita } from '../model/visita';


@Injectable({
  providedIn: 'root'
})
export class VisitaObservableHttpJsonserverService {
  URL = 'http://localhost:3000/visitas';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  getVisitas(visitas:string): Observable<Visita[]> {
    return this.httpClient.get<Visita[]>(this.URL);
  }

  post(visita: Visita): Observable<Visita> {
    return this.httpClient
      .post<Visita>(this.URL, JSON.stringify(visita), this.httpOptions);
  }
  //DELETE: Remove do db.json
  delete(visita: Visita): Observable<Visita> {
    return this.httpClient
      .delete<Visita>(this.URL+'/'+visita.id, this.httpOptions);
  }

  patch(visita: Visita): Observable<Visita> {
    return this.httpClient
      .patch<Visita>(
        this.URL+'/'+visita.id,
        JSON.stringify(visita),
        this.httpOptions
      );
  }

  //PUT: Insere todos os campos novamente
  /*put(user: User): Observable<User> {
    return this.httpClient
      .put<User>(
        `${this.URL}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      );
  }*/
}
