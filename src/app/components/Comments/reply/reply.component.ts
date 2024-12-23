import { Component, Input } from '@angular/core';
import { Reply } from '../../../models/reply';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { faComments, faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplyCommentComponent } from '../reply-comment/reply-comment.component';
import { Comment } from '../../../models/comment';
import { IdentityService } from '../../../services/auth/identity.service';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [TimeAgo, FontAwesomeModule, ReplyCommentComponent],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent {
  @Input() reply!: Reply;
  @Input() postId: string = '';
  @Input() parentComment!: Comment;

  replying: boolean = false;
  showTempReplies: boolean = true;
  tempReplies: Reply[] = [];

  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  
  constructor(
    library: FaIconLibrary,
    public identityService: IdentityService
  ) {
    library.addIcons(faComments, faThumbsUp, faThumbsDown);
  }

  toggleReply(): void {
    this.replying = !this.replying;
  }

  addTempReply(reply: Reply): void {
    this.tempReplies.unshift(reply);
    this.parentComment.totalRepliesCount++;
    this.showTempReplies = true;
  }
}
