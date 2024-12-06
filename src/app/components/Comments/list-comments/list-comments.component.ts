import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/models/comment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { IdentityService } from '../../../services/auth/identity.service';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { UpdateCommentRequest } from '../../../contracts/comments/update-comment-request';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-comments',
  standalone: true,
  imports: [FontAwesomeModule, TimeAgo, CommonModule, ReactiveFormsModule],
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.css'
})
export class ListCommentsComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;
  totalCommentCount!: number;
  comments: Comment[] = [];

  commentForm!: FormGroup;
  editingCommentId: string | null = null;;
  editContent: string = '';

  constructor(
    library: FaIconLibrary,
    private commentService: CommentService,
    private ngxSpinnerService: NgxSpinnerService,
    public identityService: IdentityService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    library.addIcons(faArrowAltCircleUp, faArrowAltCircleDown);
  }

  @Input() postId: string = '';

  ngOnInit(): void {
    this.identityService.checkIdentity();
    this.getCommentByPostId();
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  getCommentByPostId() {
    this.ngxSpinnerService.show();
    this.commentService.getCommentsByPostId(this.postId, 0, 10, this.identityService.getUserId()).subscribe({
      next: (response) => {
        this.totalCommentCount = response.totalCommentCount;
        this.comments = response.comments;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
      }
    })
  }

  deleteComment(id: string): void {
    this.notificationService.confirmDialog(
      "Emin misiniz?", 
      "Yorumunuzu silmek istediğinizden emin misiniz?", 
      "Evet, sil!", 
      "Silindi!", 
      "Yorumunuz başarılı bir şekilde silindi.",
      () => {
        this.ngxSpinnerService.show();
        this.commentService.deleteComment(id).subscribe({
          next: (response) => {
            this.ngxSpinnerService.hide();
            this.getCommentByPostId();
          },
          error: (err) => {
            this.ngxSpinnerService.hide();
            console.log(err);
          }
        });
      }
    );
  }

  editComment(commentId: string, currentContent: string) {
    this.editingCommentId = commentId;
    this.commentForm.patchValue({
      content: currentContent
    });
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.commentForm.patchValue({
      content: ''
    });
  }

  updateComment() {
    const updateCommentRequest: UpdateCommentRequest = this.commentForm.value;
    updateCommentRequest.commentId = this.editingCommentId;
    this.ngxSpinnerService.show();
    this.commentService.updateComment(updateCommentRequest).subscribe({
      next: (response) => {
        this.cancelEdit();
        this.getCommentByPostId();
        this.notificationService.showNotification(response.message, response.succeeded ? "Başarılı" : "Başarısız", {
          notificationIconType: response.succeeded ? NotificationIconType.Success : NotificationIconType.Error,
          notificationPositionType: NotificationPositionType.Center
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
