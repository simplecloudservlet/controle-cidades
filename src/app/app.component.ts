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
import { LocalStorageService } from './services/local-storage.service';
import { Constants } from './model/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  exibirCampo: boolean = false;

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

  novovalor: number=123;

  ngAfterViewInit(): void {

      M.Sidenav.init(this.sideNav?.nativeElement);
  }

  /*Injestao de dependencia @Injectable: precisa sim de import*/
  constructor(private localStorageService: LocalStorageService){
    localStorage.setItem(Constants.USERS_KEY, JSON.stringify([]));//Cria a key de usuarios
    localStorage.setItem(Constants.CIDADES_KEY, JSON.stringify([]));//Cria a key de usuarios

  }

  ngOnInit(): void {
    /*Altera no inicio da exibicao*/
    this.novovalor=456;
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

metodoExibirCampo(): void{
  if(this.exibirCampo==true)
    this.exibirCampo=false;
  else
    this.exibirCampo=true;
}

}
