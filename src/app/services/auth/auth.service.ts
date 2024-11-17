import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { RegisterRequest } from '../../contracts/auth/register-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  register(registerRequest: RegisterRequest) : Observable<ResponseModel> {
    return this.httpClientService.post<ResponseModel>({
      controller: 'auth',
      action: 'register'
    }, registerRequest);
  }
}
