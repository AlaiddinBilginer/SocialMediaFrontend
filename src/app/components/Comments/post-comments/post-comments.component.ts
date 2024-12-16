import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { IdentityService } from '../../../services/auth/identity.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent implements OnInit {
  comments: Comment[] = [];
  totalCommentCount: number = 0;
  
  @Input() postId: string = '';

  constructor(
    private commentService: CommentService,
    public identityService: IdentityService
  ) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentService
      .getCommentsByPostId(this.postId, 0, 3, this.identityService.getUserId())
      .subscribe((response) => {
        this.comments = response.comments;
        this.totalCommentCount = response.totalCommentCount
      });
  }
}
