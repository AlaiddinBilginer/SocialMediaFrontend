import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreatePostRequest } from '../../contracts/posts/create-post-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/response-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  create(createPostRequest: CreatePostRequest): Observable<ResponseModel> {
    return this.httpClientService.post({
      controller: 'posts',
      action: 'create'
    }, createPostRequest);
  }
}
