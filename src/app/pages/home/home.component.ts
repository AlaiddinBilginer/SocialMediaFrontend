import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ListPostsComponent } from '../../components/Posts/list-posts/list-posts.component';
import { PostService } from '../../services/models/post.service';
import { Post } from '../../models/post';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdentityService } from '../../services/auth/identity.service';
import { ListPublicPostsComponent } from '../../components/Posts/list-public-posts/list-public-posts.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListPostsComponent, ListPublicPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  @Output() totalPostCount: number = 0;
  @Output() posts: Post[] = [];

  constructor(
    private postService: PostService,
    private ngxSpinnerService: NgxSpinnerService,
    public identityService: IdentityService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.identityService.identityChanged$.subscribe(() => {
      if(this.identityService.isAuthenticated) {
        this.getPosts();
      } else {
        this.getPublicPosts(5);
      }
    });
  }

  getPosts() {
    this.ngxSpinnerService.show();
    this.postService.getPosts(0, 30).subscribe({
      next: (response) => {
        this.totalPostCount = response.totalPostCount;
        this.posts = response.posts;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });
  }

  getPublicPosts(limit: number) {
    this.ngxSpinnerService.show();
    this.postService.getPublicPosts(limit).subscribe((response) => {
      this.posts = response.posts;
      this.ngxSpinnerService.hide();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
