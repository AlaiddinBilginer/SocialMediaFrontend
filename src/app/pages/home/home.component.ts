import { Component } from '@angular/core';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../services/common/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private notificationService: NotificationService) {}

  showAlert() {
    this.notificationService.showNotification("Uyarı verme sistemi çalışıyor.", "Başlık", {
      notificationIconType: NotificationIconType.Success,
      notificationPositionType: NotificationPositionType.TopEnd
    });
  }

}
