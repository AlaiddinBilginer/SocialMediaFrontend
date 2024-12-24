import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/models/comment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UpdateCommentRequest } from '../../../contracts/comments/update-comment-request';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css'
})
export class EditCommentComponent implements OnInit {
  @Input() content: string = '';
  @Input() commentId: string = '';
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() refreshContent = new EventEmitter<string>();

  editForm!: FormGroup;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      content: [this.content, [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitEdit(): void {
    this.ngxSpinnerService.show();
    const updateCommentRequest: UpdateCommentRequest = this.editForm.value;
    updateCommentRequest.commentId = this.commentId;
    this.commentService.updateComment(updateCommentRequest).subscribe((response) => {
      this.ngxSpinnerService.hide();
      this.cancelEdit.emit();
      this.refreshContent.emit(updateCommentRequest.content);
    });
  }

  cancel(): void {
    this.cancelEdit.emit();
  }
}
