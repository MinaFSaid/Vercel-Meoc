import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from '../../shared/services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class ManagmentService {

  baseUrl: string = "https://41.196.137.6:5050";
  token:any = localStorage.getItem('accessToken');

  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService: EncryptDecryptService) { }

  getAddsOn(planId:any) {
    const params = new HttpParams().set('planId', planId);
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`,
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/PlanAddsOn/GetPlanAddsOn`, {params, headers });
  }

  getsubAddsOn(planId:any) {
    const params = new HttpParams().set('subscriptionId', planId);
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`,
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/PlanAddsOn/GetSubscriptionAddOns`, {params, headers });
  }

  addNewAddsOn(data:any){
    const body = data;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/PlanAddsOn/AddNewAddOn`, data,{ headers });
  }

  payNewAddOn(body:any){
    // console.log(data);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
        'Authorization': `Bearer ${this.token}`
      });
      return this._HttpClient.post<any>(`${this.baseUrl}/PlanAddsOn/PaySubscriptionAddOn`, body,{ headers });
  }

  deletePendingAddOn(data:any){
    const body = data;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/PlanAddsOn/DeleteAddOn`, data,{ headers });
  }

  paymentInquiry(data:any){
    const body = {"userId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")), "value": data}
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
    'Authorization': `Bearer ${this.token}`
  }); 
  return this._HttpClient.post<any>(`${this.baseUrl}/PlanAddsOn/PaymentInquiry`, body,{ headers });
  }
}
