
export class Visita {
  id!: string;  /*Nao pode ser vazio */
  usuario!: string; /*Nao pode ser vazio */
  cidade!: string;
  data!: string;


  constructor(usuario:string, cidade:string, data:string){
    this.id = String(Math.round(Math.random() * 500));
    this.usuario=usuario;
    this.cidade=cidade;
    this.data = data;
  }

/* Para nao atribuir imediatamente o conteudo ao objeto visita */
  public static preparar(visita: Visita){
    let u: Visita = new Visita(visita.usuario, visita.cidade, visita.data);
    u.usuario = visita.usuario;
    u.cidade = visita.cidade;
    u.data = visita.data;

    return u;
  }
  /*Adquire um objeto da API e transforma em um objeto da WebStorage */
  public static toWS(visita: Visita){
    let u: Visita = new Visita(visita.usuario, visita.cidade, visita.data);
    u.usuario = visita.usuario;
    u.cidade = visita.cidade;
    u.data = visita.data;

    return u;
  }

}
