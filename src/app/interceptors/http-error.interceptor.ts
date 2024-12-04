import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../services/common/notification.service';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService: NotificationService = inject(NotificationService);
  const ngxSpinnerService: NgxSpinnerService = inject(NgxSpinnerService);

  const errorMessages = new Map<HttpStatusCode, { title: string; message: string }>
  ([
    [
      HttpStatusCode.Unauthorized, 
      { title: "Yetkisiz İşlem", message: "Bu işlemi yapmak için yetkiniz bulunmamaktadır." }
    ],
    [
      HttpStatusCode.InternalServerError, 
      { title: "Sunucu Hatası", message: "Sunucuya erişilemedi." }
    ],
    [
      HttpStatusCode.NotFound, 
      { title: "Erişim Hatası", message: "Sunucuya yapılan istek başarısız oldu." }
    ],
    [
      HttpStatusCode.Forbidden, 
      { title: "Yetkisiz İşlem", message: "Bu işlemi gerçekleştirebilmek için gerekli izinleriniz bulunmamaktadır." }
    ],
  ]);

  const defaultError = { title: "Hata", message: "Beklenmeyen bir hata meydana geldi." };

  ngxSpinnerService.show();

  return next(req).pipe(
    catchError((error) => {
      const { title, message } = errorMessages.get(error.status) || defaultError;

      notificationService.showNotification(message, title, {
        notificationIconType: NotificationIconType.Error,
        notificationPositionType: NotificationPositionType.Center
      });

      return of(error);
    }),
    finalize(() => ngxSpinnerService.hide())
  );
};
