
import { Constants } from './constants';
import { User } from './user';
import { WebStorage } from './webstorage';
import { Injectable } from '@angular/core';

/*Injectable: Singleton. Instancia unica para toda a aplicacao */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  users!: User[];
  constructor(){
    this.users = WebStorage.get(Constants.USERS_KEY);
  }

  remover(username: string): boolean {
    this.users = WebStorage.get(Constants.USERS_KEY);
    this.users = this.users.filter((u) => { /*Recupera todos os usuarios, menos o que quero remover*/
      return u.username?.valueOf() != username?.valueOf();
    });
    WebStorage.set(Constants.USERS_KEY, this.users); //Atualiza o vetor de usuarios
    return true;
  }
  atualizar(user:User):void {
    this.users = WebStorage.get(Constants.USERS_KEY);
    this.remover(user.username); //Remove usuario do array
    this.salvar(user); //Salva o novo usuario atualizado
  }
  //Cadastra uma entidade no WebStorage
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key)!);
  }
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  salvar(user:User):void {
    this.users = this.get(Constants.USERS_KEY);
    window.alert(this.users.length);
    this.users.push(user); //insere no fim do array
    this.set(Constants.USERS_KEY, this.users);
    window.alert(this.users.length);
  }
  existir(username: string){
    this.users = WebStorage.get(Constants.USERS_KEY);
    for (let u of this.users) {
      if (u.username?.valueOf() == username?.valueOf()) {
        return true;
      }
    }
    return false;
  }
  lerUsuarios(): User[] {
    this.users = WebStorage.get(Constants.USERS_KEY);
    return this.users;
  }
}
