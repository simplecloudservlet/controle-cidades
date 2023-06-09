
import { Constants } from '../model/constants';
import { User } from '../model/user';
import { Cidade } from '../model/cidade';
import { WebStorage } from '../model/webstorage';
import { Injectable } from '@angular/core';
import { Visita } from '../model/visita';

/*Injectable: Singleton. Instancia unica para toda a aplicacao */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  users!: User[];
  cidades!: Cidade[];
  visitas!: Visita[];
  localizarvisitas!: Visita[];

  constructor(){
    this.users = WebStorage.get(Constants.USERS_KEY);
    this.cidades = WebStorage.get(Constants.CIDADES_KEY);
    this.visitas = WebStorage.get(Constants.VISITAS_KEY);
    this.localizarvisitas = WebStorage.get(Constants.LOCALIZARVISITAS_KEY);
  }

  removerUsuario(usuario: User): boolean {
    this.users = WebStorage.get(Constants.USERS_KEY);
    this.users = this.users.filter((u) => { /*Recupera todos os usuarios, menos o que quero remover*/
      return u.id?.valueOf() != usuario.id?.valueOf();
    });
    WebStorage.set(Constants.USERS_KEY, this.users); //Atualiza o vetor de usuarios
    return true;
  }
  removerCidade(cidade: Cidade): boolean {
    this.cidades = WebStorage.get(Constants.CIDADES_KEY);
    this.cidades = this.cidades.filter((u) => { /*Recupera todas as cidades, menos o que quero remover*/
      return u.id?.valueOf() != cidade.id?.valueOf();
    });
    WebStorage.set(Constants.CIDADES_KEY, this.cidades); //Atualiza o vetor de cidades
    return true;
  }
  removerVisita(visita: Visita): boolean {
    this.visitas = WebStorage.get(Constants.VISITAS_KEY);
    this.visitas = this.visitas.filter((u) => { /*Recupera todas as visitas, menos o que quero remover*/
      return u.id?.valueOf() != visita.id?.valueOf();
    });
    WebStorage.set(Constants.VISITAS_KEY, this.visitas); //Atualiza o vetor de visitas
    return true;
  }
  removerLocalizarVisitas(): boolean {
    this.visitas = [];
    WebStorage.set(Constants.LOCALIZARVISITAS_KEY, this.visitas); //Atualiza o vetor de localizarvisitas
    return true;
  }


  atualizarUsuario(user:User):void {
    this.users = WebStorage.get(Constants.USERS_KEY);
    this.removerUsuario(user); //Remove usuario do array
    this.salvarUsuario(user); //Salva o novo usuario atualizado
  }
  atualizarCidade(cidade:Cidade):void {
    this.cidades = WebStorage.get(Constants.CIDADES_KEY);
    this.removerCidade(cidade); //Remove  do array
    this.salvarCidade(cidade); //Salva o novo  atualizado
  }
  atualizarVisita(visita:Visita):void {
    this.visitas = WebStorage.get(Constants.VISITAS_KEY);
    this.removerVisita(visita); //Remove  do array
    this.salvarVisita(visita); //Salva o novo  atualizado
  }


  //Cadastra uma entidade no WebStorage
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key)!);
  }
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  salvarUsuario(user:User):void {
    this.users = this.get(Constants.USERS_KEY);
    //window.alert(this.users.length);
    this.users.push(user); //insere no fim do array
    this.set(Constants.USERS_KEY, this.users);
    //window.alert('Usuário salvo: ' + user.name);
  }
  salvarCidade(cidade:Cidade):void {
    this.cidades = this.get(Constants.CIDADES_KEY);
    //window.alert(this.cidades.length);
    this.cidades.push(cidade); //insere no fim do array
    this.set(Constants.CIDADES_KEY, this.cidades);
    //window.alert(this.cidades.length);
  }
  salvarVisita(visita:Visita):void {
    this.visitas = this.get(Constants.VISITAS_KEY);
    //window.alert(this.visitas.length);
    this.visitas.push(visita); //insere no fim do array
    this.set(Constants.VISITAS_KEY, this.visitas);
    //window.alert(this.visitas.length);
  }
  salvarLocalizarVisita(visita:Visita):void {
    this.localizarvisitas = this.get(Constants.LOCALIZARVISITAS_KEY);
    //window.alert(this.visitas.length);
    this.localizarvisitas.push(visita); //insere no fim do array
    this.set(Constants.LOCALIZARVISITAS_KEY, this.localizarvisitas);
    //window.alert(this.visitas.length);
  }

  existirUsuario(user: User){
    this.users = WebStorage.get(Constants.USERS_KEY);
    for (let u of this.users) {
      if (u.id?.valueOf() == user.id?.valueOf()) {
        return true;
      }
    }
    return false;
  }
  existirCidades(cidade: Cidade){
    this.cidades = WebStorage.get(Constants.CIDADES_KEY);
    for (let u of this.cidades) {
      if (u.id?.valueOf() == cidade.id?.valueOf()) {
        return true;
      }
    }
    return false;
  }
  existirVisitas(visita: Visita){
    this.visitas = WebStorage.get(Constants.VISITAS_KEY);
    for (let u of this.visitas) {
      if (u.id?.valueOf() == visita.id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  lerUsuarios(): User[] {
    this.users = WebStorage.get(Constants.USERS_KEY);
    return this.users;
  }
  lerCidades(): Cidade[] {
    this.cidades = WebStorage.get(Constants.CIDADES_KEY);
    return this.cidades;
  }
  lerVisitas(): Visita[] {
    this.visitas = WebStorage.get(Constants.VISITAS_KEY);
    return this.visitas;
  }
  lerLocalizarVisitas(): Visita[] {
    this.localizarvisitas = WebStorage.get(Constants.LOCALIZARVISITAS_KEY);
    return this.localizarvisitas;
  }
}
