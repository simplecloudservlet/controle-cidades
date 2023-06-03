import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';
import * as M from 'materialize-css';
import { AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit }
 from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

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

/*Passar parametro para outro componente*/
public passarParametro(v1:string, v2:string): void{

}

}
