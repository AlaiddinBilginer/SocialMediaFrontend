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
    const formData: FormData = new FormData();

    if (createPostRequest.title)
      formData.append('title', createPostRequest.title);
    if (createPostRequest.content) 
      formData.append('content', createPostRequest.content);

    formData.append('categoryId', createPostRequest.categoryId);
    
    createPostRequest.files?.forEach(file => {
      formData.append('files', file, file.name);
    });

    return this.httpClientService.post({
      controller: 'posts',
      action: 'create'
    }, formData);
  }
}
