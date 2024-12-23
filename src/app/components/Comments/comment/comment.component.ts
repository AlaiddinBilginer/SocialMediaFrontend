import { Component, Input, OnInit } from '@angular/core';
import { Reply } from '../../../models/reply';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { ReplyComponent } from '../reply/reply.component';
import { faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplyCommentComponent } from '../reply-comment/reply-comment.component';
import { IdentityService } from '../../../services/auth/identity.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [TimeAgo, ReplyComponent, FontAwesomeModule, ReplyCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input() postId: string = '';
  @Input() comment!: Comment;

  replies: Reply[] = [];
  tempReplies: Reply[] = [];
  showReplies: boolean = false;
  showTempReplies: boolean = false;
  replying: boolean = false;
  page: number = 1;
  size: number = 6;

  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(
    private commentService: CommentService,
    library: FaIconLibrary,
    public identityService: IdentityService
  ) {
    library.addIcons(faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown);
  }

  ngOnInit(): void {
    this.fetchReplies();
  }

  toggleReplies(): void {
    this.showReplies = !this.showReplies;
    if(!this.showReplies) {
      this.showTempReplies = false;
    } else {
      this.showTempReplies = true;
    }
  }
  
  fetchReplies(page: number = 0): void {
    this.commentService.getRepliesByParentComment(this.comment.id, (this.page - 1), this.size)
      .subscribe((response) => {
        this.replies = [...this.replies, ...response.replies]
      });
  }

  showMoreReplies() {
    this.page++;
    this.tempReplies = [];
    this.fetchReplies(this.page);
  }

  toggleReply(): void {
    this.replying = !this.replying;
  }

  addTempReply(reply: Reply): void {
    this.tempReplies.unshift(reply);
    this.comment.totalRepliesCount++;
    this.showTempReplies = true;
  }
}
