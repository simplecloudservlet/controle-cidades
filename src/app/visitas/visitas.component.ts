import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { User } from '../model/user';
import { Cidade } from '../model/cidade';
import { Constants } from '../model/constants';
import { UsuarioObservableHttpJsonserverService } from '../services/usuario-observable-http-jsonserver.service';
import { WebStorage } from '../model/webstorage';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent {
/*ViewChild: pai acessa o component filho dentro da classe. #form eh a variavel de template */
@ViewChild('form') formulario!: NgForm;

@ViewChild('meuselect') meuselect!: NgForm;

submetido!: boolean;
mostrarMensagem: boolean = false;
sucesso!: boolean;
mensagem!: string;

user!: User;  /*user nao pode ser vazio. Estah mapeado com o two-way data-binding [(ngModel)] */
usuarios: User[] = []; /*opcional (pode ser vazio)*/

conteudo!: any; /*para o two-way data-binding [(ngModel)]*/

constructor(
  //Service
  private localStorageService: LocalStorageService,
  //Service
  private userObservableService: UsuarioObservableHttpJsonserverService){

  //--
  //this.updateSelect();
  //--

  //window.alert('1'); //Construtor inicia ANTES do ngOnInit
}

public updateSelect(): void {

  //setTimeout(()=> {
  //  alert(this.usuarios);
 // },1000);

//Indicacao do site do materialize.css para iniciar o 'select'
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var options: any = [
    {value:1,name:"Option1"},
    {value:2,name:"Option2"},
    {value:3,name:"Option3"},
    {value:4,name:"Option4"}];
  var instances = M.FormSelect.init(elems,options);
  elems.forEach(elem => {
    console.log('.');
    //let someVar = M.FormSelect.getInstance(elem);
    //console.log(someVar);
 });
});
}
  ngAfterViewInit(): void {
    //this.updateSelect();
  }

//Angular ngOninit (inicia DEPOIS do construtor. Similar ao constructor da classe)
//Classe implements OnInit
ngOnInit(): void{

  //window.alert('2');
  this.user = new User('', '', '');
  this.usuarios = this.localStorageService.lerUsuarios(); /*Le os usuarios do localStorage */

  //Inicializa o materialize.css select
  this.updateSelect();

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


usuarioSelecionado:any
cidadeSelecionada:any
onSubmit(): void{

  alert('Visita: ' +
  this.usuarioSelecionado + '\n' +
  this.cidadeSelecionada);

  //alert((<any>this.meuselect).nativeElement.innerHTML);
 // alert(this.conteudo.length);

/* console.log('Passei por aqui');
 //document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('select');
  //console.log(elems.length+'.'+M.FormSelect.getInstance(elems.item(0)).getSelectedValues());
  console.log(elems.length);

  //  var instances = M.FormSelect.init(elems);
  elems.forEach(elem => {
    console.log('.');
    let someVar :any = M.FormSelect.getInstance(elem).getSelectedValues();
    console.log(someVar);

 });*/
//});

 //let elems = document.querySelectorAll('select');


    /*

    //var instances = M.FormSelect.init(elems);
    elems.forEach(elem => {
      let someVar = M.FormSelect.getInstance(elem);
      alert(someVar);
    });
    //let someVar = M.FormSelect.getInstance(elems[0]).getSelectedValues();
*/
    /*this.submetido = true;
    if (!this.localStorageService.existirUsuario(this.user)) {
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
    this.formulario.reset();
    this.user = new User('', '', '');
    this.usuarios= this.localStorageService.lerUsuarios();

    this.mostrarMensagem = true;
    this.sucesso = true;
    this.mensagem = 'Cadastro realizado!';
    window.alert(this.mensagem);
    */
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


  aoSelecionarUsuario(event: Event) {
    this.usuarioSelecionado = (event.target as HTMLInputElement).value;
    alert('Usuário selecionado ' + this.usuarioSelecionado);
  }
  aoSelecionarCidade(event: Event) {
    this.cidadeSelecionada = (event.target as HTMLInputElement).value;
    alert('Cidade selecionada ' + this.cidadeSelecionada);
  }

}
