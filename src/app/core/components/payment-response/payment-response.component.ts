import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.css'
})

export class PaymentResponseComponent {
  id: any;
  data:any = {};
  invoiceTransactions:any = {};
  constructor(private _paymentService:PaymentService, private _Router:Router) {
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('Id');
    if(this.id){
      this._paymentService.pay(this.id).subscribe((data)=>{
        console.log(data.result.data);
        this.data = data.result.data;
        this.invoiceTransactions = data.result.data.invoiceTransactions[0];
      })
  
    }else{
      this._Router.navigate(['/profile/plan-Billing']);
    }
    
  }

  
}
