import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../../services/models/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post';
import { ListPostsComponent } from '../../../components/Posts/list-posts/list-posts.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-post-by-category',
  standalone: true,
  imports: [ListPostsComponent],
  templateUrl: './list-post-by-category.component.html',
  styleUrl: './list-post-by-category.component.css'
})
export class ListPostByCategoryComponent {
  categoryName: string = '';
  isDataLoaded: boolean = false;
  @Output() totalPostCount!: number;
  @Output() posts: Post[] = [];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.getPostsByCategory();
    });
  }

  getPostsByCategory() {
    this.ngxSpinnerService.show();
    this.postService.getPostsByCategory(this.categoryName).subscribe({
      next: (response) => {
        this.totalPostCount = response.totalPostCount;
        this.posts = response.posts;
        this.isDataLoaded = true;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });
  }
}
