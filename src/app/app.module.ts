import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';
import { SegundoComponenteComponent } from './segundo-componente/segundo-componente.component';
import { ModalComponent } from './modal/modal.component';
import { LandPageComponent } from './land-page/land-page.component';
import { ListaCidadesComponent } from './lista-cidades/lista-cidades.component';
import { CidadesComponent } from './cidades/cidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VisitasComponent } from './visitas/visitas.component';
import { LocalizarvisitasComponent } from './localizarvisitas/localizarvisitas.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimeiroComponenteComponent,
    SegundoComponenteComponent,
    ModalComponent,
    LandPageComponent,
    ListaCidadesComponent,
    CidadesComponent,
    UsuariosComponent,
    VisitasComponent,
    LocalizarvisitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
