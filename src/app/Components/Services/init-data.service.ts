import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TenantService } from '../Services/tenant.service';
import { DOCUMENT } from '@angular/common';
import { EncryptDecryptService } from '../Services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class InitDataService {
  domainURL?: string;
  domainName?: any;
  domainNameEncrypted: any;
  domainNamedecrypted: any;
  tenatData: any = {};
  id?: number;
  countryData: any;
  constructor(private _TenantService: TenantService, private _EncryptDecryptService: EncryptDecryptService) {


  }

  initialize(): Promise<any> {
    sessionStorage.setItem("CountryId", this._EncryptDecryptService.encryptUsingAES256(10));
    if (typeof window !== 'undefined') {
      this.domainURL = window.location.host;
      const parts = this.domainURL.split('.');
      this.domainName = parts[0];
      this.domainName = "omar";
      this.domainNameEncrypted = this._EncryptDecryptService.encryptUsingAES256(this.domainName);
      localStorage.setItem('tenancyName', this.domainNameEncrypted);
      this._TenantService.getTenantCountry();
      this.domainNamedecrypted = this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem('tenancyName'));
      // this._TenantService.getTenantId(this.domainNameEncrypted).subscribe(
      //   {
      //     next:(data)=>{
      //       this.tenatData = data.result.tenantId;
      //        localStorage.setItem('tenantId', this._EncryptDecryptService.encryptUsingAES256(this.tenatData));
      //       // console.log(data);
      //     },
      //     error:(err)=>{}
      //   }
      // )
      this._TenantService.getTenantCountry().subscribe({
        next: (data) => {
          this.countryData = data.result;
          // console.log(this.countryData);
          const itemWithDisplayOrder1 = this.countryData.find((item: any) => item.displayOrder === 1);

          if (itemWithDisplayOrder1) {
            // console.log('Item with displayOrder = 1:', itemWithDisplayOrder1);
            sessionStorage.setItem("CountryId", this._EncryptDecryptService.encryptUsingAES256(itemWithDisplayOrder1.menuItemId));
          }
        },
        error: (err) => {}
      });
    }

    this.ngOnInit();
    return Promise.resolve();
  }

  ngOnInit(): void {

    this._TenantService.getTenantId(this.domainName).subscribe((data) => {
      this.tenatData = data.result.tenantId;
      localStorage.setItem('tenantId', this._EncryptDecryptService.encryptUsingAES256(this.tenatData));
    })
  }

}
