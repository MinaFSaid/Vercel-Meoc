import { HttpClient,HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';


@Injectable({
  providedIn: 'root'
})
export class TenantService {

  baseUrl:string = "https://41.196.137.6:5050";

  constructor(private _HttpClient:HttpClient, private _EncryptDecryptService:EncryptDecryptService)
  {
    
  }

  getTenantId(_body:string):Observable<any>
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = {"tenancyName": _body};
    return this._HttpClient.post<any>(this.baseUrl + '/api/services/app/Account/IsTenantAvailable',body,httpOptions);
  }

  getTenantCountry():Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.get<any>(this.baseUrl + '/Payment/GetCountry',{ headers });
  }


  

}
