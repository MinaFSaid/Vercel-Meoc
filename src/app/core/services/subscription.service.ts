import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from '../../shared/services/encrypt-decrypt.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl: string = "https://41.196.137.6:5050";
  token: any = "";
  countryId: any = this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem("CountryId"));
  receptDetails: any = {};
  planDetails: any = {};
  UsersData: any = {};

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
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetReceipts`, { params, headers });
  }

  getReceiptDetails(_receptDetails: any) {
    this.receptDetails = _receptDetails;
  }

  getPlanDetails(_planDetails: any) {
    this.planDetails = _planDetails;
  }

  assignUsers(_user: any) {
    this.UsersData = _user;
  }

  getSubscriptions() {
    const params = new HttpParams().set('userId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
      .set('tenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId")))
      .set('countryId', this.countryId.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetSubscriptions`, { params, headers });
  }

  deletePendingSubscriptions(subId: any) {
    const body = { "userId": this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")), "subscriptionId": subId }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/DeleteSubscription`, body, { headers });
  }

  PaySubscriptions(sub: any, urlParams: any) {
    // console.log(sub.subscriptionId, urlParams);
    const body = {
      "subscriptionId": sub.subscriptionId,
      "domainName": urlParams
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/PaySubscription`, body, { headers });
  }

  GetSubscriptionClinics(subId: any) {
    const params = new HttpParams().set('SubscriptionId', subId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });

    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetSubscriptionClinics`, { params, headers });
  }

  GetUserRolesClinic() {
    const params = new HttpParams().set('TenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId")));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetUserRolesClinic`, { params, headers });
  }

  AssignUserToClinic(emailAddress: any, clinicId: any, userRoleId: any) {
    const body = {
      "tenantId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))),
      "emailAddress": emailAddress,
      "clinicId": clinicId,
      "userRoleId": userRoleId,
      "userIdAdd": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/AssignUserToClinic`, body, { headers });
  }

  GetClinicUsers(clinicId: any) {
    const params = new HttpParams().set('ClinicId', clinicId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetClinicUsers`, { params, headers });
  }



  deleteUserFromClinic(userId: any, clinicId: any) {
    // const params = new HttpParams().set('userId', userId).set('clinicId', clinicId).set('userIdDelete',this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
    const body = {
      "userId": userId,
      "clinicId": clinicId,
      "userIdDelete": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId")))
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/DeleteUserFromClinic`, body, { headers })
  }

  GetSubscriptionClinicsWotName(subId: any) {
    const params = new HttpParams().set('SubscriptionId', subId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });

    return this._HttpClient.get<any>(`${this.baseUrl}/Subscription/GetSubscriptionClinicsWotName`, { params, headers });
  }

  setClinicName(ClinicId: any, ClinicName:any) {
    const body = {
      "ClinicId": ClinicId,
      "ClinicName": ClinicName
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': `${this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))}`, // Set your custom header
      'Authorization': `Bearer ${this.token}`
    });
    return this._HttpClient.post<any>(`${this.baseUrl}/Subscription/SetClinicName`, body ,{ headers });
  }
  
}
