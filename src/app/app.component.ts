import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';
import * as M from 'materialize-css';
import { AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit }
 from '@angular/core';


import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from './model/user';
//import { WebStorage } from './model/webstorage';
import { LocalStorageService } from './model/local-storage.service';
import { Constants } from './model/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  loggedIn:boolean = false;

  /*ViewChild: pai acessa o component filho dentro da classe. #form eh a variavel de template */
  @ViewChild('form') form!: NgForm;
  submetido!: boolean;
  mostrarMensagem: boolean = false;
  sucesso!: boolean;
  mensagem!: string;

  user!: User;  /*user nao pode ser vazio. Estah mapeado com o two-way data-binding [(ngModel)] */
  usuarios: User[] = []; /*opcional (pode ser vazio)*/


  /*ViewChild: pai acessa o component filho dentro da classe */
  @ViewChild('p1') p1!: PrimeiroComponenteComponent;
  @ViewChild('p2') p2!: PrimeiroComponenteComponent;

  /*Para o Materialize*/
  /*ViewChild: pai acessa o component filho dentro da classe */
  @ViewChild('mobile') sideNav?: ElementRef;

  title = 'controle-cidades';
  titulo = 'controle-cidades';
  opcao = ['opcao1','opcao2','opcao3'];

  transactions = [
    {id: '1', conteudo: 'conteudo1'},
    {id: '2', conteudo: 'conteudo2'},
    {id: '3', conteudo: 'conteudo3'}
  ];

  novovalor: number=123;

  ngAfterViewInit(): void {

      M.Sidenav.init(this.sideNav?.nativeElement);
  }

  /*Injestao de dependencia @Injectable: precisa sim de import*/
  constructor(private localStorageService: LocalStorageService){
    localStorage.setItem(Constants.USERS_KEY, JSON.stringify([]));//Cria a key de usuarios
    this.user = new User('', '', '');
    this.usuarios = this.localStorageService.lerUsuarios(); /*Le os usuarios do localStorage */
  }

  ngOnInit(): void {
    /*Altera no inicio da exibicao*/
    this.novovalor=456;
  }

  onSubmit(): void{
    this.submetido = true;
    if (!this.localStorageService.existir(this.user.username)) { /*Se nao existe, salva */
      this.localStorageService.salvar(this.user);
    } else {
      this.localStorageService.atualizar(this.user);
    }
    this.form.reset();
    this.user = new User('', '', '');
    this.usuarios= this.localStorageService.lerUsuarios();

    this.mostrarMensagem = true;
    this.sucesso = true;
    this.mensagem = 'Cadastro realizado!';

  }

  /* Para nao atribuir imediatamente o conteudo ao objeto user*/
  onEditar(user: User) {
    //this.user = user;
    let previa = User.preparar(user);
    this.user = previa;
  }
  onRemover(username: string) {
    let confirmation = window.confirm(
      'Confirma remover ' + username + '?'
    );
    if (!confirmation) {
      return;
    }
    let resposta: boolean = this.localStorageService.remover(username);
    this.mostrarMensagem = true;
    this.sucesso = resposta;
    if (resposta) {
      this.mensagem = 'Usuario removido.';
    } else {
      this.mensagem = 'Erro na remocao do usuario.';
    }
    this.usuarios = this.localStorageService.lerUsuarios();
  }


  /*Altera a variavel do botao*/
  exibir=false;

//Objeto literal utilizado no 'onTarefaEvent'
modal = {
  show: false,
  title: '',
  text: ''
};

//pai invoca este metodo quando o filho emite um evento no metodo 'ngOnChanges'
onTarefaEvent(event: boolean) {
  this.modal.show = event;
  this.modal.title = 'Janela Modal';
  this.modal.text = 'Controle de Cidades Visitadas';
  window.alert('Evento ativado');
  console.log('Evento ativado');

}
public cadastrar(): void{
  if(this.exibir==true)
    this.exibir=false;
  else
    this.exibir=true;
}

onCloseModal(){
  this.modal.show=false;
}

}
