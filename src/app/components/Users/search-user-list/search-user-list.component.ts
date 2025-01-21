import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input-follower/search-input-follower.component';
import { UserService } from '../../../services/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchUserResponse } from '../../../contracts/users/search-user-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user-list',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './search-user-list.component.html',
  styleUrl: './search-user-list.component.css'
})
export class SearchUserListComponent {
  @Output() close = new EventEmitter<void>();

  usersCount: number = 0;
  users: SearchUserResponse[] = [];

  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  getUsers(searchTerm: string) {
    this.isLoading = true;
    this.spinner.show('searchInputSpinner');
    if(searchTerm.length > 0) {
      this.userService.searchUser(searchTerm, 0, 20).subscribe((response) => {
        this.usersCount = response.userCount;
        this.users = response.users;
        this.isLoading = false;
        this.spinner.hide('searchInputSpinner');
      });
    } else {
      this.isLoading = false;
      this.users = [];
    }
  }

  closeModal() {
    this.close.emit();
    this.users = []; 
  }

  onSearch(searchTerm: string) {
    this.getUsers(searchTerm);
  }

  goToUserProfile(userName: string) {
    this.router.navigate(['/kullanici', userName]);
    this.closeModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }
}
