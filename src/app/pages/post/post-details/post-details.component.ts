import { Component, Output, ViewChild } from '@angular/core';
import { PostService } from '../../../services/models/post.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostDetailResponse } from '../../../contracts/posts/post-detail-response';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { CreatePostCommentComponent } from '../../../components/Comments/create-post-comment/create-post-comment.component';
import { PostCommentsComponent } from '../../../components/Comments/post-comments/post-comments.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [TimeAgo, RouterModule, FontAwesomeModule, CreatePostCommentComponent, PostCommentsComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  post!: PostDetailResponse;
  @Output() postId: string = '';
  faHeart = faHeart;
  faComment = faComment;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    library: FaIconLibrary,
  ) {
    library.addIcons(faHeart, faComment);
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['postId'];
      this.getPostById(this.postId);
    });
  }

  getPostById(postId: string) {
    this.postService.getPostById(postId).subscribe({
      next: (response) => {
        this.post = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onCommentCreated() {
    
  }
}
