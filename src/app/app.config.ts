import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withViewTransitions } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';



export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,

      }),
      withHashLocation(),
    ),
    provideHttpClient(),
    provideAnimations(),

  ],

};
