import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from '../../shared/services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string = "https://41.196.137.6:5050";
  token:any = localStorage.getItem('accessToken');

  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService: EncryptDecryptService) { }

 pay(data:any){
  const body = {"userId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")), "value": data}
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
    'Authorization': `Bearer ${this.token}`
  });
  return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/PaymentInquiry`, body,{ headers });
 }
}
