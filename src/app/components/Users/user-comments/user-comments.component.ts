import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../services/models/user.service';
import { GetCommentsResponse } from '../../../contracts/users/get-comments-response';
import { RouterModule } from '@angular/router';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../services/models/comment.service';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [RouterModule, TimeAgo, FontAwesomeModule, CommonModule],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.css'
})
export class UserCommentsComponent implements OnInit, OnChanges {
  @Input() userName: string = '';

  comments: GetCommentsResponse[] = [];
  totalCommentsCount: number = 0;
  page: number = 1;
  size: number = 10;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  private scrollListener!: () => void;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    library: FaIconLibrary,
    private commentService: CommentService
  ) {
    library.addIcons(faThumbsDown, faThumbsUp);
  }

  ngOnInit(): void {
    this.getComments();
    this.scrollListener = this.debounce(this.onScroll.bind(this), 200);
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName'] && !changes['userName'].firstChange) {
      this.resetComments();
      this.getComments();
    }
  }

  getComments(): void {
    this.userService.getComments(this.userName, (this.page - 1), this.size).subscribe((response) => {
        this.comments = [...this.comments, ...response.comments];
        this.totalCommentsCount = response.totalCommentsCount;
    });
  }

  getMoreComments(): void {
    if (this.page * this.size < this.totalCommentsCount) {
      this.page++;
      this.getComments();
    }
  }

  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.scrollHeight;

    if (scrollPosition >= documentHeight - 100) {
      this.getMoreComments();
    }
  }

  resetComments(): void {
    this.comments = [];
    this.page = 1;
  }

  debounce(func: Function, wait: number): () => void {
    let timeout: any;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  }

  like(commentId: string): void {
    const comment = this.comments.find(p => p.commentId === commentId);
    if (!comment) return;
  
    const currentLikeStatus = comment.isLiked;
  
    this.commentService.like(commentId).subscribe(() => {
      comment.isLiked = !currentLikeStatus;
      comment.likeCount += currentLikeStatus ? -1 : 1;
    });
  }
}
