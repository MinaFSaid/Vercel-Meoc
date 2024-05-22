import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl: string = "https://41.196.137.6:5050";
  currentUserData:any = {};
  token:any = localStorage.getItem('accessToken');
  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService: EncryptDecryptService) {
   }

   getUserData() {
    const params = new HttpParams()
    .set('userId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Account/GetUserProfile`, {params, headers });
  }

  updateUserData(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId':  `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Account/UpdateUserProfile`, data, { headers });
  }
  
  changeUserPassword(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId':  `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/api/services/app/User/ChangePassword`, data, { headers });
  }

}
