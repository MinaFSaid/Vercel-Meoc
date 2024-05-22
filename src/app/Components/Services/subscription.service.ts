import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl: string = "https://41.196.137.6:5050";
  token: any = "";
  countryId:any = this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem("CountryId"));
  receptDetails:any = {};

  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService: EncryptDecryptService) {
    this.token = localStorage.getItem('accessToken');
  }

  createSubscription(data: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`

    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/CreateSubscription`, data, { headers });
  }

  getReceipts() {
    const params = new HttpParams().set('_userId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
    .set('_tenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId")))
    .set('_countryId', this.countryId.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetReceipts`, {params, headers });
  }

  getReceiptDetails(_receptDetails:any){
    this.receptDetails = _receptDetails;
  }

  getSubscriptions(){
    const params = new HttpParams().set('userId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
    .set('tenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId")))
    .set('countryId', this.countryId.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetSubscriptions`, {params, headers });
  }

  deletePendingSubscriptions(subId:any){
    const body = {"userId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")), "subscriptionId": subId}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/DeleteSubscription`, body,{ headers });
  }

  PaySubscriptions(sub:any){
    const body = {"userId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")),
     "subscriptionId": sub.subscriptionId,
     "currencyId": sub.currencyId,
     "tenantId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId")),
     "countryId": this.countryId.toString()
      }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/PaySubscription`, body,{ headers });
  }
}
