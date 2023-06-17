import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Cidade } from '../model/cidade';
import { WebStorage } from '../model/webstorage';
import { Constants } from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private localStorageService:LocalStorageService) { }

  salvar(cidade: Cidade): Promise<Cidade> {
    /* resolve: retorna uma `Cidade`
      a resposta do `resolve` serah tratada no metodo `then` de `cidade.component`
    */
    const p = new Promise<Cidade>((resolve, reject) => {
      if(cidade.name.length < 2) {
        reject('Nome de cidade invalido');
      }

      setTimeout(() => {  /* setTimeout: funcao de callback */
        const cidades = WebStorage.get(Constants.CIDADES_KEY);
        cidades.push(cidade);
        WebStorage.set(Constants.CIDADES_KEY, cidades); /*atualiza a lista de cidades*/
        resolve(cidade);
      },3000);

    });


    return p;
  }

  atualizar(cidade: Cidade): Promise<Cidade> {
    /* resolve: retorna uma `Cidade`
      a resposta do `resolve` serah tratada no metodo `then` de `cidade.component`
    */
    const p = new Promise<Cidade>((resolve, reject) => {
      if(cidade.name.length < 2) {
        reject('Nome de cidade invalido');
      }

      setTimeout(() => {  /* setTimeout: funcao de callback */
        //this.localStorageService.atualizarCidade(cidade);
        let cidades = WebStorage.get(Constants.CIDADES_KEY);
        cidades = cidades.filter((u:Cidade) => { /*Recupera todas as cidades, menos o que quero remover*/
          return u.id?.valueOf() != cidade.id?.valueOf();
        });
      //WebStorage.set(Constants.CIDADES_KEY, cidades); //Atualiza o vetor de usuarios
      //----Ate aqui removeu
      //
      //Agora Insere o registro atualizado
      //cidades = WebStorage.get(Constants.CIDADES_KEY);
      cidades.push(cidade); //insere no fim do array
      WebStorage.set(Constants.CIDADES_KEY, cidades);
      resolve(cidade);
      },3000);

    });
    return p;
  }

    remover(cidade: Cidade): Promise<Cidade> {
      /* resolve: retorna uma `Cidade`
        a resposta do `resolve` serah tratada no metodo `then` de `cidade.component`
      */
      const p = new Promise<Cidade>((resolve, reject) => {
        if(cidade.name.length < 2) {
          reject('Nome de cidade invalido');
        }

        setTimeout(() => {  /* setTimeout: funcao de callback */
          //this.localStorageService.atualizarCidade(cidade);
        let cidades = WebStorage.get(Constants.CIDADES_KEY);
        cidades = cidades.filter((u:Cidade) => { /*Recupera todas as cidades, menos o que quero remover*/
          return u.id?.valueOf() != cidade.id?.valueOf();
        });
      WebStorage.set(Constants.CIDADES_KEY, cidades); //Atualiza o vetor de usuarios
          resolve(cidade);
        },3000);

      });


    return p;
  }

}
