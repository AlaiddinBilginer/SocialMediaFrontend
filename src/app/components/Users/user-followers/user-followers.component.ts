import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetFollowersResponse } from '../../../contracts/users/get-followers-response';
import { UserService } from '../../../services/models/user.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FollowComponent } from '../../Buttons/follow/follow.component';
import { GetFollowingResponse } from '../../../contracts/users/get-following-response';
import { RemoveFollowerComponent } from '../../Buttons/remove-follower/remove-follower.component';
import { Router, RouterModule } from '@angular/router';
import { IdentityService } from '../../../services/auth/identity.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SearchInputComponent } from '../search-input-follower/search-input-follower.component';

@Component({
  selector: 'app-user-followers',
  standalone: true,
  imports: [FontAwesomeModule, FollowComponent, RemoveFollowerComponent, RouterModule, FormsModule, NgxSpinnerModule, SearchInputComponent],
  templateUrl: './user-followers.component.html',
  styleUrl: './user-followers.component.css'
})
export class UserFollowersComponent implements OnInit {
  @Input() userName: string = '';
  @Input() profileOnwer: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() followEvent = new EventEmitter<void>();
  @Output() unfollowEvent = new EventEmitter<void>();
  @Input() mode: string = '';

  searchTerm: string = '';
  isLoading: boolean = false;

  followers: GetFollowersResponse[] = [];
  followersCount: number = 0;
  followings: GetFollowingResponse[] = [];
  followingsCount: number = 0;;

  faXmark = faXmark;

  constructor(
    private userService: UserService,
    library: FaIconLibrary,
    private router: Router,
    private identityService: IdentityService,
    private spinner: NgxSpinnerService
  ) {
    library.addIcons(faXmark);
  }

  ngOnInit(): void {
    if(this.mode === 'following') {
      this.getFollowings();
    } else {
      this.getFollowers();
    }
  }

  closeModal() {
    this.close.emit();
  }

  getFollowers(searchTerm?: string): void {
    this.isLoading = true;
    this.spinner.show('searchInputSpinner');
    this.userService.getFollowers(this.userName, 0, 20, this.identityService.getUserName() ?? this.userName, searchTerm)
      .subscribe(response => {
        this.followers = response.followers;
        this.followersCount = response.followersCount;
        this.isLoading = false;
        this.spinner.hide('searchInputSpinner');
      });
  }

  getFollowings(searchTerm?: string): void {
    this.isLoading = true;
    this.spinner.show('searchInputSpinner');
    this.userService.getFollowing(this.userName, 0, 20, this.identityService.getUserName() ?? this.userName, searchTerm)
      .subscribe(response => {
        this.followings = response.followings;
        this.followingsCount = response.followingCount;
        this.isLoading = false;
        this.spinner.hide('searchInputSpinner');
      });
  }

  follow() {
    this.followEvent.emit();
  }

  unfollow() {
    this.unfollowEvent.emit();
  }

  goToUserProfile(userName: string) {
    this.router.navigate(['/kullanici', userName]);
    this.closeModal();
  }

  onSearch(searchTerm: string) {
    if (this.mode === 'following') {
      this.getFollowings(searchTerm);
    } else {
      this.getFollowers(searchTerm);
    }
  }
}
