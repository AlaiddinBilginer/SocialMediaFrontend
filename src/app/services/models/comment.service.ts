import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreateCommentRequest } from '../../contracts/comments/create-comment-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/response-model';
import { Comment } from '../../models/comment';
import { UpdateCommentRequest } from '../../contracts/comments/update-comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  createComment(createCommentRequest: CreateCommentRequest) : Observable<ResponseModel> {
    return this.httpClientService.post({
      controller: 'comments',
      action: 'createComment'
    }, createCommentRequest);
  }

  getCommentsByPostId(postId: string, page: number = 0, size: number = 7, userId: string | null) 
  : Observable<{ totalCommentCount: number, comments: Comment[] }> {
    return this.httpClientService.get({
      controller: 'comments',
      action: 'getCommentsByPostId',
      queryString: `postId=${postId}&pagination.page=${page}&pagination.size=${size}` + (userId !== null ? `&userId=${userId}` : '')
    });
  }

  deleteComment(id: string) : Observable<ResponseModel> {
    return this.httpClientService.delete<ResponseModel>({
      controller: 'comments',
      action: 'deleteComment'
    }, id);
  }

  updateComment(updateCommentRequest: UpdateCommentRequest) : Observable<ResponseModel> {
    return this.httpClientService.put({
      controller: 'comments',
      action: 'updateComment'
    }, updateCommentRequest);
  }
}
