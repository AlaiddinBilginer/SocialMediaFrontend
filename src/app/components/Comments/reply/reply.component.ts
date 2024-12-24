import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Reply } from '../../../models/reply';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { faComments, faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplyCommentComponent } from '../reply-comment/reply-comment.component';
import { Comment } from '../../../models/comment';
import { IdentityService } from '../../../services/auth/identity.service';
import { NotificationService } from '../../../services/common/notification.service';
import { CommentService } from '../../../services/models/comment.service';

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
  @Output() refreshReplies = new EventEmitter<Reply>();

  replying: boolean = false;
  showTempReplies: boolean = true;
  tempReplies: Reply[] = [];
  activeMenuId: string | null = null;

  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faEllipsisV = faEllipsisV;
  
  constructor(
    library: FaIconLibrary,
    public identityService: IdentityService,
    private notificationService: NotificationService,
    private commentService: CommentService
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

  toggleMenu(commentId: string): void {
    this.activeMenuId = this.activeMenuId === commentId ? null : commentId;
  }

  editComment(commentId: string): void {

    this.activeMenuId = null;
  }

  deleteComment(commentId: string): void {
    this.notificationService.confirmDialog(
      "Emin Misiniz?", "Yorumunuzu silmek istediğinizden emin misiniz?",
    'Evet', 'Başarılı', 'Yorumunuz silindi', () => {
      this.commentService.deleteComment(commentId).subscribe((response) => {
        this.refreshReplies.emit(this.reply);
      });
    });
    this.activeMenuId = null;
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if(!target.closest('.dropdown')) {
      this.activeMenuId = null;
    }
  }
}
