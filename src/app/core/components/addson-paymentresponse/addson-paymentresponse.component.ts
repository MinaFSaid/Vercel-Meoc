import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagmentService } from '../../services/managment.service';

@Component({
  selector: 'app-addson-paymentresponse',
  templateUrl: './addson-paymentresponse.component.html',
  styleUrl: './addson-paymentresponse.component.css'
})
export class AddsonPaymentresponseComponent {
  id: any;
  data:any = {};
  invoiceTransactions:any = {};
  constructor(private _ManagmentService:ManagmentService, private _Router:Router) {
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('Id');
    
    if(this.id){
      this._ManagmentService.paymentInquiry(this.id).subscribe((data)=>{
        this.data = data.result.data;
        this.invoiceTransactions = data.result.data.invoiceTransactions[0];
      })
  
    }else{
      this._Router.navigate(['/profile/plan-Billing']);
    }
    
  }
}
