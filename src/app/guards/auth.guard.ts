import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { IdentityService } from '../services/auth/identity.service';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../services/common/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../services/common/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelperService: JwtHelperService = inject(JwtHelperService);
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);
  const identityService: IdentityService = inject(IdentityService);
  const notificationService: NotificationService = inject(NotificationService);
  const ngxSpinnerService: NgxSpinnerService = inject(NgxSpinnerService);

  identityService.checkIdentity();

  if(!identityService.isAuthenticated) {
    ngxSpinnerService.show();
    router.navigate([''], { queryParams: { returnUrl: state.url } }),
    notificationService.showNotification(
      'Bu işlemi gerçekleştirebilmek için oturum açmanız gerekiyor', 'Oturum Açın', {
      notificationIconType: NotificationIconType.Info,
      notificationPositionType: NotificationPositionType.Center
    });
    ngxSpinnerService.hide();
    return false;
  }

  return true;
};
