import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { InitDataService } from '../../../Services/init-data.service';
import { TenantService } from '../../../Services/tenant.service';
import { EncryptDecryptService } from '../../../Services/encrypt-decrypt.service';
import { CountrydataService } from './../../../Services/countrydata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  countryData: any;
  @ViewChild('ddlViewBy') ddlViewBy!: ElementRef<HTMLSelectElement>;
  selectedValue: string = '';
  selectedText: string = '';

  constructor(private _AuthenticationService: AuthenticationService,
    private _InitDataService: InitDataService,
    private _TenantService: TenantService,
    private _EncryptDecryptService: EncryptDecryptService,
    private _CountrydataService: CountrydataService
  ) {

  }

  onSelectionChange(): void {
    const selectedIndex = this.ddlViewBy.nativeElement.selectedIndex;
    this.selectedValue = this.ddlViewBy.nativeElement.value;
    this.selectedText = this.ddlViewBy.nativeElement.options[selectedIndex].text;
    this._CountrydataService.setSelectedDropdown(this.selectedValue);
    sessionStorage.setItem("CountryId", this._EncryptDecryptService.encryptUsingAES256(this.selectedValue));
  }

  ngOnInit(): void {
    // Subscribe to userAccessData changes
    this._AuthenticationService.getUserAccessData().subscribe((accessToken) => {
      this.isLogin = !!accessToken;
    });
    this.getTenantsCountry();
  }


  getTenantsCountry(): Promise<any> {
    // let tenantEncryptedId =localStorage.getItem('tenantId');
    this._TenantService.getTenantCountry().subscribe((data) => {
      this.countryData = data.result;
      // console.log(this.countryData);
      const itemWithDisplayOrder1 = this.countryData.find((item: any) => item.displayOrder === 1);

      if (itemWithDisplayOrder1) {
        // console.log('Item with displayOrder = 1:', itemWithDisplayOrder1);
        sessionStorage.setItem("CountryId", this._EncryptDecryptService.encryptUsingAES256(itemWithDisplayOrder1.menuItemId));
      }
    });

    return Promise.resolve();
  }

  logout(): void {
    this._AuthenticationService.logout();
  }

}
