import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showNotification(
    message: string, 
    title:string,
    notificationOptions: Partial<NotificationOptions>
  ): void {
    Swal.fire({
      title,
      text: message,
      icon: notificationOptions.notificationIconType,
      showConfirmButton: false,
      position: notificationOptions.notificationPositionType,
      timer: 2000,
      customClass: {
        popup: 'dark-theme-popup small-modal'
      }
    });
  }

  confirmDialog(
    title: string, text: string,
    confirmButtonText: string,
    resultTitle: string, resultText: string,
    onConfirm: () => void
  ) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "İptal",
      customClass: {
        popup: 'dark-theme-popup small-modal'
      }
    }).then((result) => {
      if(result.isConfirmed) {
        onConfirm();

        Swal.fire({
          title: resultTitle,
          text: resultText,
          icon: "success",
          customClass: {
            popup: 'dark-theme-popup'
          }
        });
      }
    });
  }

  confirmWarning(title: string) {
    Swal.fire({
      title: title,
      customClass: {
        popup: 'dark-theme-popup'
      },
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
}

export class NotificationOptions {
  notificationIconType!: NotificationIconType;
  notificationPositionType!: NotificationPositionType;
}

export enum NotificationIconType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Question = 'question',
  Warnig = 'warning'
}

export enum NotificationPositionType {
  Bottom = 'bottom',
  BottomEnd = 'bottom-end',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  BottomStart = 'bottom-start',
  Center = 'center',
  CenterEnd = 'center-end',
  CenterLeft = 'center-left',
  CenterRight = 'center-right',
  CenterStart = 'center-start',
  Top = 'top',
  TopEnd = 'top-end',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  TopStart = 'top-start',
}
