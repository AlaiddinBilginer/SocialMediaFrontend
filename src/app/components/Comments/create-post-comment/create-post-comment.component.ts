import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdentityService } from '../../../services/auth/identity.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/models/comment.service';
import { CreateCommentRequest } from '../../../contracts/comments/create-comment-request';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-post-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post-comment.component.html',
  styleUrl: './create-post-comment.component.css'
})
export class CreatePostCommentComponent implements OnInit {
  commentForm!: FormGroup;
  maxChars = 500;
  currentChars = 0;

  constructor(
    public identityService: IdentityService,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    identityService.checkIdentity();
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  @Input() postId: string = '';

  @Output() commentCreated = new EventEmitter<void>();

  create() {
    this.ngxSpinnerService.show();
    const createCommentRequest: CreateCommentRequest = this.commentForm.value;
    createCommentRequest.postId = this.postId;
    this.commentService.createComment(createCommentRequest).subscribe({
      next: (response) => {
        this.ngxSpinnerService.hide();
        this.notificationService.showNotification(
          response.message, response.succeeded ? "Başarılı" : "Başarısız", 
          {
            notificationIconType: response.succeeded ? NotificationIconType.Success : NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.BottomRight
          }
        );
        this.commentForm.reset();

        this.commentCreated.emit();
      },
      error: (err) => {
        console.log("hata: ", err)
      }
    })
  }
}
