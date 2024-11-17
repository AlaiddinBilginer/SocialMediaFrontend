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
