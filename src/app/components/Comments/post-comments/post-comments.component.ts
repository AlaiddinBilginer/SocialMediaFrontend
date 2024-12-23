import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { IdentityService } from '../../../services/auth/identity.service';
import { CommentComponent } from '../comment/comment.component';
import { Reply } from '../../../models/reply';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent implements OnInit {
  @Input() postId: string = '';
  
  comments: Comment[] = [];
  totalCommentCount: number = 0;
  page: number = 1;
  size: number = 8;

  constructor(
    private commentService: CommentService,
    public identityService: IdentityService
  ) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.page = 1;
    this.commentService
      .getCommentsByPostId(this.postId, (this.page - 1), this.size, this.identityService.getUserId())
      .subscribe((response) => {
        this.comments = response.comments;
        this.totalCommentCount = response.totalCommentCount
      });
  }

  fetchMoreComments(): void {
    this.page++;
    this.commentService
    .getCommentsByPostId(this.postId, (this.page - 1), this.size, this.identityService.getUserId())
    .subscribe((response) => {
      this.comments = [...this.comments, ...response.comments]
      this.totalCommentCount = response.totalCommentCount
    });
  }
}
