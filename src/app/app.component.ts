import * as M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, ViewChild }
 from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mobile') sideNav?: ElementRef;

  titulo = 'controle-cidades';
  opcao = ['opcao1','opcao2','opcao3'];

  ngAfterViewInit(): void {

      M.Sidenav.init(this.sideNav?.nativeElement);
  }
}
