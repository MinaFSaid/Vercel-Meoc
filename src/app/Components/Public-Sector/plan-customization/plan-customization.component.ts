import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { PlanPricesService } from '../../Services/plan-prices.service';
import { SubscriptionService } from './../../Services/subscription.service';
import { CreateSubscription } from '../../Interfaces/create-subscription';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  styleUrl: './plan-customization.component.css'
})
export class PlanCustomizationComponent implements OnInit {
  id: any;
  plans: any = [];
  isloading: boolean = false;
  totalPrice: number = 0;
  displayTotalPrice: number = 0;
  f1Value: number = 0;
  f2Value: number = 0;
  f1minQty: number = 0;
  f2minQty: number = 0;
  monthly: boolean = true;
  subscription: CreateSubscription;

  constructor(private route: ActivatedRoute,
    private _EncryptDecryptService: EncryptDecryptService,
    private _PlanPricesService: PlanPricesService,
    private _SubscriptionService: SubscriptionService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    const DecryptedId = this._EncryptDecryptService.decryptUsingAES256(this.id);
    this._PlanPricesService.setPlanId(DecryptedId);

    this._PlanPricesService.getPlanDetails().subscribe({
      next: (data) => {
        this.plans = data.result;
        // console.log(this.plans);
        this.subscription.currencyId = this.plans.currencyId;
        this.subscription.planId = this.plans.planId;
        this.subscription.planPricingId = this.plans.planPricingId;
        this.totalPrice = data.result.totalPrice;
        this.displayTotalPrice = this.totalPrice;
        this.f1Value = data.result.planFeature[0].minQuantity
        this.subscription.features[0].featureId = data.result.planFeature[0].featureId;
        this.subscription.features[1].featureId = data.result.planFeature[1].featureId;
        this.f1minQty = data.result.planFeature[0].minQuantity
        this.f2Value = data.result.planFeature[1].minQuantity
        this.f2minQty = data.result.planFeature[1].minQuantity
        this.isloading = true;
      },
      error:(err)=>{console.log(err);},
    })

    // init the subscription creation

    this.subscription =
    {
      "subscriptionId": 0,
      "userId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem('userId'))),
      "totalSubscriptionPrice": 0,
      "totalSubscriptionMonths": 0,
      "isAutoRenew": true,
      "tenantId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem('tenantId'))),
      "currencyId": this.plans.currencyId,
      "countryId": parseInt(this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem('CountryId'))),
      "planId": this.plans.planId,
      "planPricingId": this.plans.planPricingId,
      "features": [
        {
          "featureId": 0,
          "doctorQuantity": 0,
          "clinicQuantity": 0
        },
        {
          "featureId": 0,
          "doctorQuantity": 0,
          "clinicQuantity": 3
        }
      ]
    }

  }

  ngOnInit(): void {
    
  }

  incrementF1(input: HTMLInputElement, maxQuantity: any): void {
    let value = parseInt(input.value);
    if (value < maxQuantity) {
      input.value = (value + 1).toString();
      this.f1Value = value + 1;
    }
    this.calcTotalPrice();
  }

  decrementF1(input: HTMLInputElement): void {
    let value = parseInt(input.value);
    if (value > this.plans.planFeature[0].minQuantity) {
      input.value = (value - 1).toString();
      this.f1Value = value - 1;
    }
    this.calcTotalPrice();
  }

  isMaxQuantityReachedF1(input: HTMLInputElement, maxQuantity: number): boolean {
    return parseInt(input.value, 10) >= maxQuantity;
  }
  isMinQuantityReachedF1(input: HTMLInputElement, minQuantity: number): boolean {
    return parseInt(input.value, 10) <= minQuantity;
  }

  incrementF2(input: HTMLInputElement, maxQuantity: any): void {
    let value = parseInt(input.value);
    if (value < maxQuantity) {
      input.value = (value + 1).toString();
      this.f2Value = value + 1;
    }
    this.calcTotalPrice();
  }

  decrementF2(input: HTMLInputElement): void {
    let value = parseInt(input.value);
    if (value > this.plans.planFeature[1].minQuantity) {
      input.value = (value - 1).toString();
      this.f2Value = value - 1;
    }
    this.calcTotalPrice();
  }

  isMaxQuantityReachedF2(input: HTMLInputElement, maxQuantity: number): boolean {
    return parseInt(input.value, 10) >= maxQuantity;
  }
  isMinQuantityReachedF2(input: HTMLInputElement, minQuantity: number): boolean {
    return parseInt(input.value, 10) <= minQuantity;
  }

  calcTotalPrice() {
    if (this.monthly) {
      this.displayTotalPrice = this.totalPrice
        - ((this.f1minQty / this.plans.planFeature[0].unitDefaultValue) * this.plans.planFeature[0].pricePerUnit)
        - ((this.f2minQty / this.plans.planFeature[1].unitDefaultValue) * this.plans.planFeature[1].pricePerUnit)
        + ((this.f1Value / this.plans.planFeature[0].unitDefaultValue) * this.plans.planFeature[0].pricePerUnit)
        + ((this.f2Value / this.plans.planFeature[1].unitDefaultValue) * this.plans.planFeature[1].pricePerUnit)
    } else {
      this.displayTotalPrice = (this.totalPrice * 12 * 0.7)
        - ((this.f1minQty / this.plans.planFeature[0].unitDefaultValue) * this.plans.planFeature[0].pricePerUnit * 12 * 0.7)
        - ((this.f2minQty / this.plans.planFeature[1].unitDefaultValue) * this.plans.planFeature[1].pricePerUnit * 12 * 0.7)
        + ((this.f1Value / this.plans.planFeature[0].unitDefaultValue) * this.plans.planFeature[0].pricePerUnit * 12 * 0.7)
        + ((this.f2Value / this.plans.planFeature[1].unitDefaultValue) * this.plans.planFeature[1].pricePerUnit * 12 * 0.7)
    }
  }

  onBillingTypeChange(billingType: string): void {

    if (billingType == 'annually') {
      this.monthly = false;
      this.displayTotalPrice = Math.floor(this.displayTotalPrice * 12 * 0.7);
      console.log(this.displayTotalPrice)
    } else if (billingType == 'monthly') {
      this.monthly = true;
      this.displayTotalPrice = Math.round(this.displayTotalPrice / (12 * 0.7));
    }
  }

  calculateMonthlyPrice(monthlyPrice: number): number {
    return Math.floor(monthlyPrice / (12 * 0.7));
  }

  createSubscription() {
    this.subscription.features[0].doctorQuantity = this.f1Value;
    this.subscription.features[1].clinicQuantity = this.f2Value;
    this.subscription.totalSubscriptionPrice = this.displayTotalPrice;
    if(this.monthly){
      this.subscription.totalSubscriptionMonths = 1
    }else{
      this.subscription.totalSubscriptionMonths = 12
    }
    this._SubscriptionService.createSubscription(this.subscription).subscribe({
      next: (data) => {
        // console.log(data);
        this.successAlert();
      },
      error: (err) => {
        // console.log(err);
        this.failAlert();
      },
    })
  }

  successAlert(){
    Swal.fire({
      title: "Plan Added Successfully",
      text: "Thank You",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(() => {
      // this._Router.navigate(['/home']);
    }, 1500);
    
  }

  failAlert(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 2000
    });
  }
}

