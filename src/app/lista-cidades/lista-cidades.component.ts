import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-cidades',
  templateUrl: './lista-cidades.component.html',
  styleUrls: ['./lista-cidades.component.css']
})
export class ListaCidadesComponent implements OnInit, OnChanges, AfterViewInit {

 // @Input() valor!: string; /* filho recebe do pai */

  //@Output() tarefa = new EventEmitter<boolean>(); /* filho emite evento para o pai*/
                                                 /* pai usa (event binding) para capturar o evento*/


  constructor(private route: ActivatedRoute){}

  idParam!: string;
  public ngOnInit(): void {
    this.idParam = this.route.snapshot.queryParams['id']; /*Recebe parametro 'id' da URL */
    console.log('idParam: ' + this.idParam);
  }

  ngAfterViewInit(): void {

    this.idParam = this.route.snapshot.queryParams['id'];
  }

  ngOnChanges(): void {
  /*
    if(this.valor)
      //this.tarefa.emit(true);
      setTimeout(()=> {
        this.tarefa.emit(true);
      },1000);
*/
  }
  getIdParam(): string {
      return this.idParam;
  }
}
