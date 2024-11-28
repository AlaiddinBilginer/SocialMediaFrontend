import { Component, Output } from '@angular/core';
import { ListPostsComponent } from '../../components/Posts/list-posts/list-posts.component';
import { PostService } from '../../services/models/post.service';
import { Post } from '../../models/post';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() totalPostCount!: number;
  @Output() posts: Post[] = [];

  constructor(
    private postService: PostService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.getPosts();
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
}
