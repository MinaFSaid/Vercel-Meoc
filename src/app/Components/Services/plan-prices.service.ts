import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class PlanPricesService {
  baseUrl: string = "https://41.196.137.6:5050";
  planIdDetails:any;
  countryId:any = this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem("CountryId"));
  constructor(private _HttpClient: HttpClient, private _EncryptDecryptService: EncryptDecryptService) { }


  getPlansPrices(value:any): Observable<any> {
    // Set query parameters
    const params = new HttpParams().set('_countryId', value.toString()).set('tenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))); // Set your desired tenant
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': this._EncryptDecryptService.decryptUsingAES256(
        localStorage.getItem('tenantId')
      ),
    });
  
    return this._HttpClient.get<any>(`${this.baseUrl}/Plan/GetPricing`,{ params, headers });
  }

  setPlanId(id:any){this.planIdDetails = id;}

  getPlanDetails(): Observable<any> {
    // Set query parameters
    const params = new HttpParams().set('_countryId', this.countryId.toString()).set('_tenantId', this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem('tenantId'))).set('_planId', this.planIdDetails);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Abp.TenantId': this._EncryptDecryptService.decryptUsingAES256(
        localStorage.getItem('tenantId')
      ),
    });
  
    return this._HttpClient.get<any>(`${this.baseUrl}/Plan/GetPlanDetails`,{ params, headers });
  }
}
