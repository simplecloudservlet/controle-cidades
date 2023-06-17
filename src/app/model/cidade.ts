
export class Cidade {
  id!: string;  /*Nao pode ser vazio */
  name!: string; /*Nao pode ser vazio */

  constructor(name:string){
    this.id = String(Math.round(Math.random() * 500));
    this.name=name;
  }

/* Para nao atribuir imediatamente o conteudo ao objeto cidade */
  public static preparar(cidade: Cidade){
    let u: Cidade = new Cidade(cidade.name);
    u.name = cidade.name;
    return u;
  }
  /*Adquire um objeto da API e transforma em um objeto da WebStorage */
  public static toWS(cidade: Cidade){
    let u: Cidade = new Cidade(cidade.name);
    u.name = cidade.name;
    return u;
  }

}
