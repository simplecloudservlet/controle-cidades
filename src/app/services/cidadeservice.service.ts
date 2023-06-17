import { Injectable } from '@angular/core';
import { Cidade } from '../model/cidade';
import { WebStorage } from '../model/webstorage';
import { Constants } from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor() { }

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
}
