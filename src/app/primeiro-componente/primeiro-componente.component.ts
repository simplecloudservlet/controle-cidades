import { Component } from '@angular/core';

@Component({
  selector: 'app-primeiro-componente',
  templateUrl: './primeiro-componente.component.html',
  styleUrls: ['./primeiro-componente.component.css']
})
export class PrimeiroComponenteComponent {
  nome: string = 'Controle de Cidades';

  public getNome(): string{
    return this.nome;
  }
  public getTexto(): string{
    return 'Cidades';
  }
  public cadastrar(): string{
    return 'Cidades';
  }
}
