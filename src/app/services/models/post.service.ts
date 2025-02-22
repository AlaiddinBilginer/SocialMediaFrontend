import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreatePostRequest } from '../../contracts/posts/create-post-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/response-model';
import { Post } from '../../models/post';
import { PostDetailResponse } from '../../contracts/posts/post-detail-response';
import { IdentityService } from '../auth/identity.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private httpClientService: HttpClientService,
    private identityService: IdentityService
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

  getPosts(page: number = 0, size: number = 8) : Observable<{ totalPostCount: number, posts: Post[] }> {
    return this.httpClientService.get<{ totalPostCount: number, posts: Post[] }>({
      controller: 'posts',
      action: 'getPostsByUser',
      queryString: `Pagination.Page=${page}&Pagination.Size=${size}`
    });
  }

  getPostsByCategory(categoryName: string, page: number = 0, size: number = 8) 
  : Observable<{ totalPostCount: number, posts: Post[] }> {
    return this.httpClientService.get<{ totalPostCount: number, posts: Post[] }>({
      controller: 'posts',
      action: 'getPostsByCategory',
      queryString: `Pagination.Page=${page}&Pagination.Size=${size}&CategoryName=${categoryName}`
    });
  }

  getPostById(postId: string) : Observable<PostDetailResponse> {
    return this.httpClientService.get<PostDetailResponse>({
      controller: 'posts',
      action: 'getById',
      queryString: `id=${postId}`
    });
  }

  like(postId: string, userId: string | null = this.identityService.getUserId()): Observable<ResponseModel> {
    return this.httpClientService.post({
      controller: 'posts',
      action: 'likePost'
    }, { postId, userId });
  }

  getPublicPosts(limit: number = 10): Observable<{ posts: Post[] }> {
    return this.httpClientService.get({
      controller: 'posts',
      action: 'getPublicPosts',
      queryString: `limit=${limit}`
    });
  }

  getPopularPosts(page: number, size: number, userId: string | null)
  : Observable<{ totalPostCount: number, posts: Post[] }> {
    let queryString: string = `pagination.page=${page}&pagination.size=${size}`;

    if(userId)
      queryString = queryString + `&currentUserId=${userId}`;

    return this.httpClientService.get({
      controller: 'posts',
      action: 'getPopularPosts',
      queryString: queryString
    });
  }
}
