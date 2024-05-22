import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlanPricesService } from '../../Services/plan-prices.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { CountrydataService } from './../../Services/countrydata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plans-prices',
  templateUrl: './plans-prices.component.html',
  styleUrl: './plans-prices.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlansPricesComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    autoplay: true,
    autoWidth: true,
    nav: true
  }
  plans?: any = [];
  isloading: boolean = false;
  data?: any;
  groupedPlans: any = {};
  subscription: Subscription;
  constructor(private _PlanPricesService: PlanPricesService,
    private _Router: Router,
    private _EncryptDecryptService: EncryptDecryptService,
    private _CountrydataService: CountrydataService
  ) {
    this.subscription = this._CountrydataService.getSelectedDropdown().subscribe(value => {

      this._PlanPricesService.getPlansPrices(value).subscribe((plans) => {
        this.plans = plans.result.planObject
        this.isloading = true;
      })
    });
    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getThisPlan(id: any) {
    const encryptedId = this._EncryptDecryptService.encryptUsingAES256(id)
    this._Router.navigate(['/Plan', encryptedId]);
  }

}