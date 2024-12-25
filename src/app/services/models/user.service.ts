import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

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
}
