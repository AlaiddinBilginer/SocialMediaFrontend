import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/models/user.service';
import { IdentityService } from '../../../services/auth/identity.service';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent {
  @Input() userName: string = ''; 
  @Input() isFollower: boolean = true;
  @Output() followEvent = new EventEmitter<void>();
  @Output() unfollowEvent = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    public identityService: IdentityService
  ) {}

  follow() {
    this.userService.follow(this.userName).subscribe((response) => {
      if(response.succeeded) {
        this.followEvent.emit();
        this.isFollower = true;
      }
    });
  }

  unfollow() {
    this.userService.unfollow(this.userName).subscribe((response) => {
      if(response.succeeded) {
        this.unfollowEvent.emit();
        this.isFollower = false;
      }
    })
  }
}
