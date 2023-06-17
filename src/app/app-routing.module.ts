import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';
import { SegundoComponenteComponent } from './segundo-componente/segundo-componente.component';
import { ListaCidadesComponent } from './lista-cidades/lista-cidades.component';
import { CidadesComponent } from './cidades/cidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path : '', component: LandPageComponent},
  {path : 'controle-cidades', component: LandPageComponent},
  {path : 'controle-cidades/lista-cidades', component: ListaCidadesComponent},
  {path : 'controle-cidades/primeiro', component: PrimeiroComponenteComponent},
  {path : 'controle-cidades/segundo', component: SegundoComponenteComponent},
  {path : 'controle-cidades/cidades', component: CidadesComponent},
  {path : 'controle-cidades/usuarios', component: UsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
