import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faUser, faCog, faSignOutAlt, faL } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from "../../../components/Auth/login-modal/login-modal.component";
import { IdentityService } from '../../../services/auth/identity.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { SearchUserListComponent } from '../../../components/Users/search-user-list/search-user-list.component';
import { SearchInputComponent } from "../../../components/Users/search-input-follower/search-input-follower.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, LoginModalComponent, SearchUserListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faPlus = faPlus;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  isOpen = false;
  isLoginModalOpen = false;

  constructor(
    library: FaIconLibrary,
    public identityService: IdentityService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    identityService.checkIdentity();
    library.addIcons(faPlus);
  }

  toggleLoginModal() {
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  signOut() {
    this.localStorageService.delete('accessToken');
    this.identityService.checkIdentity();
    this.identityService.notifyIdentityChanged();
    this.router.navigate(['/']);
    this.notificationService.showNotification('Hesabınızdan çıkış yapılmıştır. Tekrardan bekleriz :)', "Çıkış Yapıldı", {
      notificationIconType: NotificationIconType.Success,
      notificationPositionType: NotificationPositionType.BottomRight
    });
    this.isOpen = false;
  }

  closeDropdown() {
    this.isOpen = false;
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if(!target.closest('.dropdown-container') && !target.closest('.dropdown-button')) {
      this.isOpen = false;
    }
  }
}
