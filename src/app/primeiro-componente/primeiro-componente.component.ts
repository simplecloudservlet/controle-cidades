import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-primeiro-componente',
  templateUrl: './primeiro-componente.component.html',
  styleUrls: ['./primeiro-componente.component.css']
})
export class PrimeiroComponenteComponent implements OnInit, OnChanges {

  @Input() valor: boolean = false; /* filho recebe do pai via template. Inicia com false. Nao deve ser alterado no filho*/
                              /* pai usa [property binding] para enviar para o filho*/
  conteudo!: string;
  nome: string = 'Controle de Cidades';

  @Output() tarefa = new EventEmitter<boolean>(); /* filho emite evento para o pai*/
                                                 /* pai usa (event binding) para capturar o evento*/


  numero: number = 0;

  /*Preenchido pelo app.component (pai)*/
  @Input() menuText!: string;

   /*Altera a variavel do botao*/
   exibir=false;

   idParam!: string;
   conteudoParam!: string;

  constructor(private route: ActivatedRoute){}


  cidades = [
    {id: '1', conteudo: 'cidade1'},
    {id: '2', conteudo: 'cidade2'},
    {id: '3', conteudo: 'cidade3'}
  ];

  //Filho envia evento para o pai
  ngOnChanges(): void {
    if(this.valor)
      //this.tarefa.emit(true);
      setTimeout(()=> {
        this.tarefa.emit(true);
      },1000);
  }
  ngOnInit(): void {
  }

  getIdParam(): string {
    return this.idParam;
  }

  public getNome(): string{
    return this.nome;
  }
  public getTexto(): string{
    return 'Cidades';
  }
  public alterarNumero(): void {
    this.numero++;
  }


public cadastrar(): void{
  if(this.exibir==true)
    this.exibir=false;
  else
    this.exibir=true;
}




}
