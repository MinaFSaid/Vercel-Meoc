import { Component } from '@angular/core';
import { InitDataService } from '../../Services/init-data.service';
import { TenantService } from '../../Services/tenant.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';

@Component({
  selector: 'app-landing-page-layout',
  templateUrl: './landing-page-layout.component.html',
  styleUrl: './landing-page-layout.component.css'
})
export class LandingPageLayoutComponent{

  constructor(private _InitDataService:InitDataService,private _TenantService:TenantService, private _EncryptDecryptService:EncryptDecryptService)
  {
    this._InitDataService.initialize(); 
  }
  
}
