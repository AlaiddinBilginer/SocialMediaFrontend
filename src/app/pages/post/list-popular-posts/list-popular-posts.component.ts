import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/models/post.service';
import { ListPostsComponent } from '../../../components/Posts/list-posts/list-posts.component';
import { Post } from '../../../models/post';
import { IdentityService } from '../../../services/auth/identity.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListPublicPostsComponent } from '../../../components/Posts/list-public-posts/list-public-posts.component';

@Component({
  selector: 'app-list-popular-posts',
  standalone: true,
  imports: [ListPostsComponent, ListPublicPostsComponent],
  templateUrl: './list-popular-posts.component.html',
  styleUrl: './list-popular-posts.component.css'
})
export class ListPopularPostsComponent implements OnInit {
  totalPostCount: number = 0;
  posts: Post[] = [];
  page: number = 1;
  size: number = 8;

  constructor(
    private postService: PostService,
    public identityService: IdentityService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getPopularPosts();
  }

  getPopularPosts() {
    this.ngxSpinnerService.show();
    this.postService.getPopularPosts((this.page -1), this.size, this.identityService.getUserId())
      .subscribe((response) => {
        this.posts = response.posts;
        this.totalPostCount = response.totalPostCount;
        this.ngxSpinnerService.hide();
      });
  }

  getMorePopularPosts(): void {
    this.page++;
    if(this.page * this.size <= this.totalPostCount) {
      this.ngxSpinnerService.show();
      this.postService.getPopularPosts((this.page - 1), this.size, this.identityService.getUserId()).subscribe((response) => {
        this.posts = [...this.posts, ...response.posts];
        this.ngxSpinnerService.hide();
      });
    }
  }

}
