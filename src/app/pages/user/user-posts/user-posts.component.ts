import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/models/user.service';
import { Post } from '../../../models/post';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListPostsComponent } from '../../../components/Posts/list-posts/list-posts.component';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [ListPostsComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit {
  @Input() userName: string = '';

  posts: Post[] = [];
  totalPostCount: number = 0;
  page: number = 1;
  size: number = 8;

  constructor(
    private userService: UserService,
    private ngxSpinnerService: NgxSpinnerService
  ) {} 

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.ngxSpinnerService.show();
    this.userService.getPosts(this.userName, (this.page - 1), this.size).subscribe((response) => {
      this.totalPostCount = response.totalPostCount;
      this.posts = response.posts;
      this.ngxSpinnerService.hide();
    });
  }

  getMorePosts(): void {
    this.page++;
    if(this.page * this.size <= this.totalPostCount) {
      this.ngxSpinnerService.show();
      this.userService.getPosts(this.userName, (this.page - 1), this.size).subscribe((response) => {
        this.totalPostCount = response.totalPostCount;
        this.posts = [...this.posts, ...response.posts];
        this.ngxSpinnerService.hide();
      });
    }
  }
}
