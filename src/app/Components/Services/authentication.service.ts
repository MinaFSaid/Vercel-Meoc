import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login } from '../Interfaces/login';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://41.196.137.6:5050'; // API base URL
  userAccessData = new BehaviorSubject<string | null>(null);

  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService:EncryptDecryptService, private _Router:Router) {
    const accessToken = localStorage.getItem('accessToken');
    this.userAccessData.next(accessToken);
  }

  logout(): void {
    // Clear the access token from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.userAccessData.next(null);
    this._Router.navigate(['/signin']);
  }
  
  getUserAccessData(): BehaviorSubject<string | null> {
    return this.userAccessData;
  }

  signInAuth(data: Login): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}` // Set your custom header
    });

    return this._HttpClient.post<any>(`${this.baseUrl}/api/TokenAuth/Authenticate`, data, { headers });
  }

  signUpAuth(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId':  `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'countryId': this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem("CountryId")),
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/api/services/app/Account/Register`, data, { headers });
  }
}
