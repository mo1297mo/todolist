import { ApplicationConfig } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    HttpClientModule // Add HttpClientModule to the providers array
  ]
};
