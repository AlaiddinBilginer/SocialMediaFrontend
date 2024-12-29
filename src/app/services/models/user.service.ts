import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { ResponseModel } from '../../contracts/common/response-model';
import { GetCommentsResponse } from '../../contracts/users/get-comments-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  getProfile(userName: string) : Observable<User> {
    return this.httpClientService.get({
      controller: 'users',
      action: 'getUserProfile',
    }, userName);
  }

  getPosts(userName: string, page: number = 0, size: number = 10) : Observable<{ totalPostCount: number, posts: Post[] }> {
    return this.httpClientService.get({
      controller: 'users',
      action: 'getPosts',
      queryString: `UserName=${userName}&Pagination.Page=${page}&Pagination.Size=${size}`
    });
  }

  follow(followedUserName: string): Observable<ResponseModel> {
    return this.httpClientService.post({
      controller: 'users',
      action: 'follow'
    }, null, followedUserName);
  }

  unfollow(unfollowedUserName: string): Observable<ResponseModel> {
    return this.httpClientService.post({
      controller: 'users',
      action: 'unfollow'
    }, null, unfollowedUserName);
  }

  getComments(userName: string, page: number = 0, size: number = 10)
  : Observable<{ totalCommentsCount: number, comments: GetCommentsResponse[]}> {
    return this.httpClientService.get({
      controller: 'users',
      action: 'getComments',
      queryString: `userName=${userName}&pagination.page=${page}&pagination.size=${size}`
    });
  }
}
