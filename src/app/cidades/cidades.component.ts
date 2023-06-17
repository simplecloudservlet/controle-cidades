
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cidade } from '../model/cidade';
import { LocalStorageService } from '../services/local-storage.service';
import { CidadeService } from '../services/cidadeservice.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css'],
  //providers: CidadeserviceService
})
export class CidadesComponent implements OnInit, AfterViewInit{

/*ViewChild: pai acessa o component filho dentro da classe. #form eh a variavel de template */
@ViewChild('form') form!: NgForm;
submetido: boolean = false;
mostrarMensagem: boolean = false;
sucesso: boolean = false;
mensagem!: string;

cidade!: Cidade;  /*cidade nao pode ser vazio. Estah mapeado com o two-way data-binding [(ngModel)] */
cidades: Cidade[] = []; /*opcional (pode ser vazio)*/

time = 0; /* relogio para mostrar o tempo de submissao onPromise assincrono */
  interval: string | number | undefined;

constructor(
  private localStorageService: LocalStorageService,
  private cidadeService: CidadeService){

  this.cidade = new Cidade('');
  this.cidades = this.localStorageService.lerCidades(); /*Le os cidades do localStorage */
}
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }

  onSubmit(): void{

   /* //Chamada sincrona para salvar a cidade
    this.submetido = true;
    //Se nao existe, salva
    if (!this.localStorageService.existirCidades(this.cidade.name)) {
      this.localStorageService.salvarCidade(this.cidade);
    } else {
      this.localStorageService.atualizarCidade(this.cidade);
    }
    this.form.reset();
    this.cidade = new Cidade('');
    this.cidades= this.localStorageService.lerCidades();

    this.mostrarMensagem = true;
    this.sucesso = true;
    this.mensagem = 'Cadastro realizado!';
*/
    //Chamada assincrona (Uso de Promise do JavaScript aqui)
    //Se nao existe, salva
    //window.alert(this.cidade.id+" "+this.cidade.name);
    if (!this.localStorageService.existirCidades(this.cidade)) {
      //window.alert('Nao existe: ' + this.cidade.id+" "+this.cidade.name);
      this.mostrarMensagem=false;
      this.mostrarMensagem = false;
      this.sucesso = false;
      this.mensagem = '';
      this.submetido= false;

      //Promise (chamada assincrona)
      this.cidadeService.salvar(this.cidade)
    .then(() => { /* recebe a resposta do `resolve` do `cidade.service` */
      this.form.reset();
      this.cidade = new Cidade('');
      this.cidades= this.localStorageService.lerCidades();

      this.mostrarMensagem = true;
      this.sucesso = true;
      this.mensagem = 'Cadastro realizado!';
      this.submetido= true;
    })
    .catch((e: string) => {
      this.sucesso = false;
      this.mensagem = e;
    })
    .finally(() => {
      console.log('Operacao concluida');
    });


    } else {
      this.localStorageService.atualizarCidade(this.cidade);

      this.form.reset();
      this.cidade = new Cidade('');
      this.cidades= this.localStorageService.lerCidades();

      this.mostrarMensagem = true;
      this.sucesso = true;
      this.mensagem = 'Cadastro atualizado!';
      this.submetido= true;
    }


  }

  /* Para nao atribuir imediatamente o conteudo ao objeto cidade*/
  onEditar(cidade: Cidade) {
    this.cidade = cidade;
    //let previa = Cidade.preparar(cidade);
    //this.cidade = previa;
  }
  onRemover(cidade: Cidade) {
    let confirmation = window.confirm(
      'Confirma remover ' + cidade.name + '?'
    );
    if (!confirmation) {
      return;
    }
    let resposta: boolean = this.localStorageService.removerCidade(cidade);
    this.mostrarMensagem = true;
    this.sucesso = resposta;
    if (resposta) {
      this.mensagem = 'Cidade removida.';
    } else {
      this.mensagem = 'Erro na remocao da cidade.';
    }
    this.cidades = this.localStorageService.lerCidades();
  }


}
