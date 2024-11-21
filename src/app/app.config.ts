import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { authInterceptor } from './interceptors/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    importProvidersFrom([
      BrowserAnimationsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.apiUrl]
        }
      })
    ])
  ]
};
