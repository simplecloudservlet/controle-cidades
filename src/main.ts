import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//Inicio Locale
import { LOCALE_ID, enableProdMode } from '@angular/core';

platformBrowserDynamic()
   .bootstrapModule(AppModule, {
      providers: [{provide: LOCALE_ID, useValue: 'pt-BR' }],
})
.catch((err) => console.error(err));
//Fim locale

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
