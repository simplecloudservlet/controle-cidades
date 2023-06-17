import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioObservableHttpJsonserverService {
  URL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  getByUsername(username: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}/${username}`);
  }

  post(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.URL+'/usuarios', JSON.stringify(user), this.httpOptions);
  }
  //DELETE: Remove do db.json
  delete(user: User): Observable<User> {
    return this.httpClient
      .delete<User>(this.URL+'/usuarios/'+user.id, this.httpOptions);
  }

  patch(user: User): Observable<User> {
    return this.httpClient
      .patch<User>(
        this.URL+'/usuarios/'+user.id,
        JSON.stringify(user),
        this.httpOptions
      );
  }

  //PUT: Insere todos os campos novamente
  put(user: User): Observable<User> {
    return this.httpClient
      .put<User>(
        `${this.URL}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      );
  }
}
