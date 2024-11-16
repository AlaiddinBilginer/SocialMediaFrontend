import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faUser, faCog, faSignOutAlt, faL } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from "../../../components/Auth/login-modal/login-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, LoginModalComponent],
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

  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus);
  }

  toggleLoginModal() {
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }
}
