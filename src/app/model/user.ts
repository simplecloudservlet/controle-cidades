
export class User {
  id!: string;  /*Nao pode ser vazio */
  name!: string; /*Nao pode ser vazio */
  username: string;
  password: string;

  constructor(name:string, username:string, password:string){
    this.id = String(Math.round(Math.random() * 500));
    this.name=name;
    this.username=username;
    this.password=password;
  }

/* Para nao atribuir imediatamente o conteudo ao objeto user */
  public static preparar(user: User){
    let u: User = new User(user.name, user.username, user.password);
    u.name = user.name;
    u.username = user.username;
    u.password = user.password;
    return u;
  }
  /*Adquire um objeto da API e transforma em um objeto da WebStorage */
  public static toWS(user: User){
    let u: User = new User(user.name, user.username, user.password);
    u.name = user.name;
    u.username=user.username;
    u.password=user.password;
    return u;
  }

}
