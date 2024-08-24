import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { InitDataService } from '../../services/init-data.service';
import { TenantService } from '../../services/tenant.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { CountrydataService } from '../../../public/services/countrydata.service';
import { SharedCoreService } from './../../../core/services/sharedCore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  isLogin: boolean = false;
  countryData: any;
  @ViewChild('ddlViewBy') ddlViewBy!: ElementRef<HTMLSelectElement>;
  selectedValue: string = '';
  selectedText: string = '';
  userName: string = '';
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _InitDataService: InitDataService,
    private _TenantService: TenantService,
    private _EncryptDecryptService: EncryptDecryptService,
    private _CountrydataService: CountrydataService,
    private _SharedCoreService:SharedCoreService
  ) {

    if(localStorage.getItem('userId') != null || localStorage.getItem('userId') != undefined)
    {
      this._SharedCoreService.getUserData().subscribe(data => {
        this.userName = data.result.userName;
      })
    }
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
