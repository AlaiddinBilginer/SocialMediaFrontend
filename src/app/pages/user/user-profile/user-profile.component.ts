import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { UserService } from '../../../services/models/user.service';
import { ActivatedRoute } from '@angular/router';
import { IdentityService } from '../../../services/auth/identity.service';
import { UserPostsComponent } from '../../../components/Users/user-posts/user-posts.component';
import { UserCommentsComponent } from '../../../components/Users/user-comments/user-comments.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormatDatePipe, UserPostsComponent, UserCommentsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userName: string = '';
  whichShow: string = 'posts';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public identityService: IdentityService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userName = params.get('userName') || '';
      this.getUserProfile(this.userName);
    });
  }

  getUserProfile(userName: string) {
    this.userService.getProfile(userName).subscribe((user) => {
      this.user = user;
    });
  }

  follow() {
    this.userService.follow(this.userName).subscribe((response) => {
      if(response.succeeded) {
        this.user.isFollower = true;
        this.user.followersCount++;
      }
    });
  }

  unfollow() {
    this.userService.unfollow(this.userName).subscribe((response) => {
      if(response.succeeded) {
        this.user.isFollower = false;
        this.user.followersCount--;
      }
    })
  }

  show(value?: string) {
    switch (value) {
      case 'comments':
        this.whichShow = 'comments'
        break;
      default:
        this.whichShow = 'posts'
        break;
    }
  }
}
