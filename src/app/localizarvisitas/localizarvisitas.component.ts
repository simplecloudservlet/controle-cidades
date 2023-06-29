import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { User } from '../model/user';
import { Cidade } from '../model/cidade';
import { Constants } from '../model/constants';
import { UsuarioObservableHttpJsonserverService } from '../services/usuario-observable-http-jsonserver.service';
import { WebStorage } from '../model/webstorage';
import { LocalStorageService } from '../services/local-storage.service';
import { CidadeObservableHttpJsonserverService } from '../services/cidade-observable-http-jsonserver.service';
import { VisitaObservableHttpJsonserverService } from '../services/visita-observable-http-jsonserver.service';
import { Visita } from '../model/visita';

@Component({
  selector: 'app-localizarvisitas',
  templateUrl: './localizarvisitas.component.html',
  styleUrls: ['./localizarvisitas.component.css']
})

export class LocalizarvisitasComponent {
/*ViewChild: pai acessa o component filho dentro da classe. #form eh a variavel de template */
@ViewChild('form') formulario!: NgForm;

@ViewChild('selectusuario') selectusuario!: NgForm;
@ViewChild('selectcidade') selectcidade!: NgForm;

submetido!: boolean;
mostrarMensagem: boolean = false;
sucesso!: boolean;
mensagem!: string;

user!: User;
usuarios: User[] = [];

cidade!: Cidade;
cidades: Cidade[] = [];

visita!: Visita;
visitas: Visita[] = []; //Todas as Visitas

localizarvisitas: Visita[] = []; //Apenas as visitas do usuarioSelecionado

constructor(
    //Service
    private localStorageService: LocalStorageService,

    //Service (recupera usuarios do db.json via HTTP)
    private userObservableService: UsuarioObservableHttpJsonserverService,

    //Service (recupera cidades do db.json via HTTP)
    //private cidadeObservableService: CidadeObservableHttpJsonserverService,

    //Service (recupera visitas do db.json via HTTP)
    private visitaObservableService: VisitaObservableHttpJsonserverService
  ){

  //window.alert('1'); //Construtor inicia ANTES do ngOnInit
  }

public updateSelect(): void {

  //setTimeout(()=> {
  //  alert(this.usuarios);
 // },1000);

//Indicacao do site do materialize.css para iniciar o 'select'
//document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var options: any; //Inicializa o options com alguns valores (opcional)
  var instances = M.FormSelect.init(elems,options);
}

public updateDate(): void {
  //Removi a linha abaixo porque o DOMContentLoaded pode ter sido feito de outro component.
  //Entao, sempre executa a inicializacao quando entra neste componente, e nao apenas quando o DOMContentLoaded eh realizado.
 // document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options:any = [{autoClose:true,format:'dd,mmm,yyyy'}];
    var instances = M.Datepicker.init(elems, options);
  //});
}


  ngAfterViewInit(): void {


    //alert('ngAfterViewInit');
    //this.updateSelect();
  }

//Angular ngOninit (inicia DEPOIS do construtor. Similar ao constructor da classe)
//Classe implements OnInit
ngOnInit(): void{

  //window.alert('2');
  this.user = new User('', '', '');
  this.usuarios = this.localStorageService.lerUsuarios(); /*Le os usuarios do localStorage */
  this.cidade = new Cidade('');
  this.cidades = this.localStorageService.lerCidades(); /*Le as cidades do localStorage */
  this.visita = new Visita('','','');
  this.visitas = this.localStorageService.lerVisitas(); /*Le as cidades do localStorage */

  this.localizarvisitas = [];//inicializa o resultado da pesquisa em null

  //Inicializa o materialize.css select
  this.updateSelect();

  //Inicializa o materialize.css datepicker
  this.updateDate();

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


      //---Le todas as visitas
  try {

    this.visitaObservableService
    .getVisitas()  //Busca pelas cidades no db.json
    .subscribe((c: Visita[]) => { //Ativa a execucao do getVisitas a partir daqui

      c.forEach(element => {
        if (!this.localStorageService.existirVisitas(element)) { /*Se nao existe, salva */
          this.localStorageService.salvarVisita(element) //insere no localstorage
        }
        //Atualiza a exibicao
        this.visitas= this.localStorageService.lerVisitas();
        }
      );
    })} catch(e){    //Nao conseguiu trazer do json-server
      //Entao traz do localStorage (traz o que estiver em cache. Se der um refresh, perde tudo)
      this.visita = WebStorage.get(Constants.VISITAS_KEY);
      console.log('JSON Server desligado. Leitura do localStorage');
    };


    //alert('ngOnInit');
}


usuarioSelecionado:any
//cidadeSelecionada:any
//dataSelecionada:any
onSubmit(): void{

  alert('Localizar visitas do Usuario: ' + '\n' +
  this.usuarioSelecionado);

  //Limpa o vetor da pesquisa
  this.localizarvisitas = [];
  //Limpa no localStorage
  this.localStorageService.removerLocalizarVisitas();

  this.submetido = true;

      //Tenta localizar no JSON Server
      try {
      this.visitaObservableService
      .getVisitasUsuario(this.usuarioSelecionado)
      .subscribe((u: Visita[] )=> {
        u.forEach(element => {
          this.localStorageService.salvarLocalizarVisita(element) //insere no localstorage
          console.log('Visita ' + element.id + ' Localizada no JSON Server')
        })
        //Atualiza a exibicao
        this.localizarvisitas= this.localStorageService.lerLocalizarVisitas();
      });
      } catch (e) {
        console.log('Erro ao salvar no JSON Server');
      }

    this.formulario.reset();
    this.usuarioSelecionado=null;

    this.mostrarMensagem = true;
    this.sucesso = true;
    this.mensagem = 'Terminou a pesquisa!';
    alert(this.mensagem);

  }//fim onSubmit

  /* Para nao atribuir imediatamente o conteudo ao objeto visita*/
  onEditar(visita: Visita) {
    this.visita = visita;
    //let previa = User.preparar(user);
    //this.user = previa;
  }

  onRemover(visita: Visita) {
    let confirmation = window.confirm(
      'Confirma remover ' + visita.id + '?'
    );
    if (!confirmation) {
      return;
    }
    let resposta: boolean = this.localStorageService.removerVisita(visita);
    //Tenta remover no JSON Server
    try {
      this.visitaObservableService
      .delete(visita)
      .subscribe(() => console.log(visita.id + ' Removida no JSON Server'));
      } catch (e) {
        console.log('Erro ao remover no JSON Server');
      }

    this.mostrarMensagem = true;
    this.sucesso = resposta;
    if (resposta) {
      this.mensagem = 'Visita removida.';
    } else {
      this.mensagem = 'Erro na remocao da visita.';
    }
    this.visitas = this.localStorageService.lerVisitas();
  }//fim onRemover

  //Eventos dos campos de selecao
  aoSelecionarUsuario(event: Event) {
    this.usuarioSelecionado = (event.target as HTMLInputElement).value;
    //alert('Usuário selecionado ' + this.usuarioSelecionado);
  }
 /* aoSelecionarCidade(event: Event) {
    this.cidadeSelecionada = (event.target as HTMLInputElement).value;
    //alert('Cidade selecionada ' + this.cidadeSelecionada);
  }
  aoSelecionarData(event: Event) {
    this.dataSelecionada = (event.target as HTMLInputElement).value;
    //alert('Data selecionada ' + this.dataSelecionada);
  }*/

}
