import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../services/common/local-storage.service';
import { inject } from '@angular/core';
import { IdentityService } from '../services/auth/identity.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const identityService: IdentityService = inject(IdentityService);

  const token = localStorageService.get('accessToken');
  identityService.checkIdentity();

  if(token && identityService.isAuthenticated) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
