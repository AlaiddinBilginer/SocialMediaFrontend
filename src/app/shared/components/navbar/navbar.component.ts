import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faPlus = faPlus;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  isOpen = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus);
  }
}
