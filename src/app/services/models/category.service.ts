import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { ListCategoryResponse } from '../../contracts/categories/list-category-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() : Observable<{ categories: ListCategoryResponse[]}> {
    return this.httpClientService.get<{ categories: ListCategoryResponse[]}>({
      controller: 'categories',
      action: 'getAll'
    });
  }
}
