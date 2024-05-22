import { Component } from '@angular/core';
import { SubscriptionService } from '../../Services/subscription.service';
import { Router } from '@angular/router';
import { SharedService } from './../../Services/shared.service';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrl: './receipt-details.component.css'
})
export class ReceiptDetailsComponent {
  receiptData: any = {};
  startDateOnly: any = '';
  userData: any = {};
  constructor(private _SubscriptionService: SubscriptionService, private _Router: Router, private _SharedService:SharedService) {

    this._SharedService.getUserData().subscribe({
      next:(data)=>{
        this._SharedService.currentUserData = data.result;
        this.userData = data.result;
      }
    })

    this.receiptData = this._SubscriptionService.receptDetails;
    if (this.isReceiptDataEmpty(this.receiptData)) {
      this._Router.navigate(['/profile/receipts']);
    } else {
      const timestamp = this._SubscriptionService.receptDetails.startDate;
      this.startDateOnly = new Date(timestamp).toISOString().split('T')[0];
    }
  }
  isReceiptDataEmpty(data: any): boolean {
    return data === null || data === undefined || Object.keys(data).length === 0;
  }
}
