import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';
import { SegundoComponenteComponent } from './segundo-componente/segundo-componente.component';
import { ListaCidadesComponent } from './lista-cidades/lista-cidades.component';

const routes: Routes = [
  {path : '', component: LandPageComponent},
  {path : 'lista-cidades', component: ListaCidadesComponent},
  {path : 'primeiro', component: PrimeiroComponenteComponent},
  {path : 'segundo', component: SegundoComponenteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
