import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './../../Services/subscription.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent implements OnInit {

  Receipts: any;
  isRecept: boolean = false;
  isloading: boolean = false;

  constructor(private _SubscriptionService: SubscriptionService,
    private _Router: Router,
    private _EncryptDecryptService: EncryptDecryptService,
  ) { }

  ngOnInit(): void {
    this.getReceipts();
  }

  getReceipts() {
    this._SubscriptionService.getReceipts().subscribe((Receipts) => {
      this.Receipts = Receipts.result
      this.isloading = true;
      if(this.Receipts.length > 0){
        this.isRecept = true;
      }
    })
  }

  getThisReceipt(data: any) {
    this._SubscriptionService.getReceiptDetails(data);
    this._Router.navigate(['/profile/receipt']);
  }
}
