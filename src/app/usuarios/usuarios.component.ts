import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { Constants } from '../model/constants';
import { UsuarioObservableHttpJsonserverService } from '../services/usuario-observable-http-jsonserver.service';
import { WebStorage } from '../model/webstorage';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,AfterViewInit{

/*ViewChild: pai acessa o component filho dentro da classe. #form eh a variavel de template */
@ViewChild('form') form!: NgForm;
submetido!: boolean;
mostrarMensagem: boolean = false;
sucesso!: boolean;
mensagem!: string;

user!: User;  /*user nao pode ser vazio. Estah mapeado com o two-way data-binding [(ngModel)] */
usuarios: User[] = []; /*opcional (pode ser vazio)*/

constructor(
  //Service
  private localStorageService: LocalStorageService,
  //Service
  private userObservableService: UsuarioObservableHttpJsonserverService){

    //window.alert('1'); //Construtor inicia ANTES do ngOnInit
}
  ngAfterViewInit(): void {

  }

//Angular ngOninit (inicia DEPOIS do construtor. Similar ao constructor da classe)
//Classe implements OnInit
ngOnInit(): void{
  //window.alert('2');
  this.user = new User('', '', '');
  this.usuarios = this.localStorageService.lerUsuarios(); /*Le os usuarios do localStorage */

  /*Utiliza Observable para trazer do json-server a lista de usuarios */
  /*Insere o conteudo do db.json no localStorage */
  try {

  this.userObservableService
  .getByUsername(Constants.USERS_KEY)  //Busca pelos usuarios no db.json
  .subscribe((u: User[]) => { //Ativa a execucao do getByUsername a partir daqui

    u.forEach(element => {
      if (!this.localStorageService.existirUsuario(element)) { /*Se nao existe, salva */
        this.localStorageService.salvarUsuario(element) //insere no localstorage
      }
      //Atualiza a exibicao
      this.usuarios= this.localStorageService.lerUsuarios();
      }
    );
  })} catch(e){    //Nao conseguiu trazer do json-server
    //Entao traz do localStorage (traz o que estiver em cache. Se der um refresh, perde tudo)
    this.user = WebStorage.get(Constants.USERS_KEY);
    console.log('JSON Server desligado. Leitura do localStorage');
  };

  //window.alert(this.usuarios.length);
}

  onSubmit(): void{
    this.submetido = true;
    if (!this.localStorageService.existirUsuario(this.user)) { /*Se nao existe, salva */
      this.localStorageService.salvarUsuario(this.user);

      //Tenta salvar no JSON Server
      try {
      this.userObservableService
      .post(this.user)
      .subscribe((u: User)=> console.log(u.name + ' Salvo no JSON Server'));
      } catch (e) {
        console.log('Erro ao salvar no JSON Server');
      }

    } else {
      this.localStorageService.atualizarUsuario(this.user);

      //Tenta atualizar no JSON Server
    try {
      this.userObservableService
      .patch(this.user)
      .subscribe((u: User)=> console.log(u.name + ' Atualizado no JSON Server'));
      } catch (e) {
        console.log('Erro ao atualizar no JSON Server');
      }

    }
    this.form.reset();
    this.user = new User('', '', '');
    this.usuarios= this.localStorageService.lerUsuarios();

    this.mostrarMensagem = true;
    this.sucesso = true;
    this.mensagem = 'Cadastro realizado!';
    window.alert(this.mensagem);
  }

  /* Para nao atribuir imediatamente o conteudo ao objeto user*/
  onEditar(user: User) {
    this.user = user;
    //let previa = User.preparar(user);
    //this.user = previa;
  }
  onRemover(user: User) {
    let confirmation = window.confirm(
      'Confirma remover ' + user.name + '?'
    );
    if (!confirmation) {
      return;
    }
    let resposta: boolean = this.localStorageService.removerUsuario(user);
    //Tenta remover no JSON Server
    try {
      this.userObservableService
      .delete(user)
      .subscribe(() => console.log(user.name + ' Removido no JSON Server'));
      } catch (e) {
        console.log('Erro ao remover no JSON Server');
      }

    this.mostrarMensagem = true;
    this.sucesso = resposta;
    if (resposta) {
      this.mensagem = 'Usuario removido.';
    } else {
      this.mensagem = 'Erro na remocao do usuario.';
    }
    this.usuarios = this.localStorageService.lerUsuarios();
  }


}
