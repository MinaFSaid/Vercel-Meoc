import { Component } from '@angular/core';
import { SubscriptionService } from '../../Services/subscription.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-subscription-managment',
  templateUrl: './subscription-managment.component.html',
  styleUrl: './subscription-managment.component.css'
})
export class SubscriptionManagmentComponent {
  planDetails: any = {};

  constructor(private _SubscriptionService: SubscriptionService, private _Router: Router, private _SharedService:SharedService) {

    this.planDetails = this._SubscriptionService.planDetails;
    // console.log(this.planDetails);
    if (this.isReceiptDataEmpty(this.planDetails)) {
      this._Router.navigate(['/profile/plan-Billing']);
    }
  }
  isReceiptDataEmpty(data: any): boolean {
    return data === null || data === undefined || Object.keys(data).length === 0;
  }
}
