import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Reply } from '../../../models/reply';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { ReplyComponent } from '../reply/reply.component';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplyCommentComponent } from '../reply-comment/reply-comment.component';
import { IdentityService } from '../../../services/auth/identity.service';
import { NotificationService } from '../../../services/common/notification.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [TimeAgo, ReplyComponent, FontAwesomeModule, ReplyCommentComponent, EditCommentComponent, RouterModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input() postId: string = '';
  @Input() comment!: Comment;
  @Output() refreshListing = new EventEmitter<void>();

  replies: Reply[] = [];
  tempReplies: Reply[] = [];
  showReplies: boolean = false;
  showTempReplies: boolean = false;
  replying: boolean = false;
  editing: boolean = false;
  page: number = 1;
  size: number = 6;
  activeMenuId: string | null = null;
  

  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faEllipsisV = faEllipsisV;

  constructor(
    private commentService: CommentService,
    library: FaIconLibrary,
    public identityService: IdentityService,
    private notificationService: NotificationService,
  ) {
    library.addIcons(faComments, faThumbsUp, faThumbsDown, faArrowAltCircleDown, faEllipsisV);
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
  
  fetchReplies(): void {
    this.page = 1;
    this.commentService.getRepliesByParentComment(this.comment.id, (this.page - 1), this.size)
      .subscribe((response) => {
        this.replies = response.replies;
      });
  }

  showMoreReplies() {
    this.page++;
    this.tempReplies = [];
    this.commentService.getRepliesByParentComment(this.comment.id, (this.page - 1), this.size)
      .subscribe((response) => {
        this.replies = [...this.replies, ...response.replies]
      });
  }

  toggleReply(): void {
    this.replying = !this.replying;
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    this.activeMenuId = null;
  }

  addTempReply(reply: Reply): void {
    this.tempReplies.unshift(reply);
    this.comment.totalRepliesCount++;
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
        this.refreshListing.emit();
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

  refresReplieshDelete(reply: Reply) {
    const deletedReply = this.replies.indexOf(reply);
    if(deletedReply !== -1) {
      this.replies.splice(deletedReply, 1);
      this.comment.totalRepliesCount--;
    }
  }

  refreshTempRepliesDelete(reply: Reply) {
    const deletedReply = this.tempReplies.indexOf(reply);
    if(deletedReply !== -1) {
      this.tempReplies.splice(deletedReply, 1);
      this.comment.totalRepliesCount--;
    }
  }

  updateContent(content: string) {
    this.comment.content = content;
  }
}
