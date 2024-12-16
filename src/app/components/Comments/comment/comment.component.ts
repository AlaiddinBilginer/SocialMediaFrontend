import { Component, Input, OnInit } from '@angular/core';
import { Reply } from '../../../models/reply';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { ReplyComponent } from '../reply/reply.component';
import { faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [TimeAgo, ReplyComponent, FontAwesomeModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  replies: Reply[] = [];
  showReplies: boolean = false;
  totalReplies: number = 0;
  page: number = 1;
  size: number = 2;

  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faArrowAltCircleDown = faArrowAltCircleDown;

  @Input() comment!: Comment;

  constructor(
    private commentService: CommentService,
    library: FaIconLibrary
  ) {
    library.addIcons(faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown);
  }

  ngOnInit(): void {
    this.fetchReplies()
  }

  toggleReplies(): void {
    this.showReplies = !this.showReplies;
  }
  
  fetchReplies(page: number = 0): void {
    this.commentService.getRepliesByParentComment(this.comment.id, (this.page - 1), this.size)
      .subscribe((response) => {
        this.replies = [...this.replies, ...response.replies]
      });
  }

  showMoreReplies() {
    this.page++;
    this.fetchReplies(this.page);
  }
}
