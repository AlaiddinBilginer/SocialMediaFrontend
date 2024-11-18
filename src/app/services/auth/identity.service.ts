import { Injectable } from '@angular/core';
import { LocalStorageService } from '../common/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private _isAuthenticated: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) { 
    this.checkIdentity();
  }

  checkIdentity() {
    const token: string | null = this.localStorageService.get('accessToken');
    let isExpired: boolean;

    try {
      isExpired = token ? this.jwtHelperService.isTokenExpired(token) : true;
    } catch {
      isExpired = true;
    }

    this._isAuthenticated = token !== null && !isExpired;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getUserName() : string | null {
    const token = this.localStorageService.get('accessToken');
    if(token && this.isAuthenticated) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    };
    return null;
  }

  getProfilePhoto() : string | null {
    const token = this.localStorageService.get('accessToken');
    if(token && this.isAuthenticated) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken['ProfilePhoto'] || null;
    };
    return null;
  }

  getFullName() : string | null {
    const token = this.localStorageService.get('accessToken');
    if(token && this.isAuthenticated) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken['FullName'] || null;
    };
    return null;
  }
}
