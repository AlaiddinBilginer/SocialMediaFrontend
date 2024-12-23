import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/models/comment.service';
import { CreateCommentRequest } from '../../../contracts/comments/create-comment-request';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reply } from '../../../models/reply';

@Component({
  selector: 'app-reply-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reply-comment.component.html',
  styleUrl: './reply-comment.component.css'
})
export class ReplyCommentComponent implements OnInit {
  @Input() postId: string = ''; 
  @Input() parentCommentId: string = '';
  @Output() cancelReply = new EventEmitter<void>();
  @Output() listSentReply = new EventEmitter<Reply>();

  replyForm!: FormGroup;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitReply(): void {
    this.ngxSpinnerService.show();
    const createCommentRequest: CreateCommentRequest = this.replyForm.value;
    createCommentRequest.postId = this.postId;
    createCommentRequest.parentCommentId = this.parentCommentId;
    this.commentService.createComment(createCommentRequest).subscribe((response) => {
      this.ngxSpinnerService.hide();
      this.cancelReply.emit();
      this.listSentReply.emit(response);
    });
  }

  cancel(): void {
    this.cancelReply.emit();
  }
}
