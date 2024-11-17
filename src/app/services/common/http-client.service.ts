import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  private buildUrl(requestParameters: Partial<RequestParameters>, id?: string): string {
    if(requestParameters.fullEndpoint)
      return requestParameters.fullEndpoint;

    let segments = [
      requestParameters.baseUrl ?? this.baseUrl,
      requestParameters.controller,
      requestParameters.action,
      id
    ].filter(segment => !!segment);

    let url = segments.join('/');

    if(requestParameters.queryString) {
      url += `?${requestParameters.queryString}`;
    }

    return url
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    const url = this.buildUrl(requestParameters, id);
    return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: any): Observable<T> {
    const url = this.buildUrl(requestParameters);
    return this.httpClient.post<T>(url, body, { headers: requestParameters.headers });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: any): Observable<T> {
    const url = this.buildUrl(requestParameters);
    return this.httpClient.put<T>(url, body, { headers: requestParameters.headers });
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    const url = this.buildUrl(requestParameters, id);
    return this.httpClient.delete<T>(url, { headers: requestParameters.headers });
  }

}

export interface RequestParameters {
  controller: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
