import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { SharedCoreService } from '../../services/sharedCore.service';
import { ManagmentService } from '../../services/managment.service';
import { EncryptDecryptService} from '../../../shared/services/encrypt-decrypt.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subscription-managment',
  templateUrl: './subscription-managment.component.html',
  styleUrl: './subscription-managment.component.css'
})
export class SubscriptionManagmentComponent {
  planDetails: any = {};
  addsOn: any = [];
  SubscriptionAddsOn: any = [];
  defalt: any = { defaltValue: 1 };
  url:any;
  addThisFeature: any = {
    "qty": 0,
    "unitPrice": 0,
    "totalPrice": 0,
    "endDate": "2024-08-21T17:00:33.737Z",
    "comments": "string",
    "userId": 0,
    "tenantId": 0,
    "subscriptionId": 0,
    "featureType": "string",
    "featureId": 0,
    "planAddOnsId": 0
  }
  payAddsOn:any = {
      "subscriptionAddOnId": 0,
      "domainName": "string"
    }
  
  deleteAddsOn:any = {
    "subscriptionAddsOnId": 0,
    "userId": 0
  }

  constructor(private _SubscriptionService: SubscriptionService,
    private _Router: Router,
    private _SharedService: SharedCoreService,
    private _ManagmentService: ManagmentService,
    private _EncryptDecryptService: EncryptDecryptService) {

    this.planDetails = this._SubscriptionService.planDetails;
    // console.log(this.planDetails);
    if (this.isReceiptDataEmpty(this.planDetails)) {
      this._Router.navigate(['/profile/plan-Billing']);
    }
    else {
      this.url = window.location.origin + "/profile/addsOnpayment-response";
      this._ManagmentService.getAddsOn(this.planDetails.planId).subscribe((data) => {
        this.addsOn = data.result.map((item: any) => ({
          ...item,
          "defaultValue": 1
        }));
      })
      this.getAddsOn();
    }

  }

  showSuccess(msg: string) {
    Swal.fire({
      title: msg,
      icon: "success",
      showConfirmButton: false,
      timer: 2500
    });
  }

  showfail(msg: string) {
    Swal.fire({
      icon: "error",
      title: msg,
      showConfirmButton: false,
      timer: 2500
    });
  }


  getAddsOn(){
    this._ManagmentService.getsubAddsOn(this.planDetails.subscriptionId).subscribe((data) => {
      // console.log(data.result);
      this.SubscriptionAddsOn = data.result;
    })
  }

  isReceiptDataEmpty(data: any): boolean {
    return data === null || data === undefined || Object.keys(data).length === 0;
  }

  incrementQuantity(item: any): void {
    if (item.defaultValue < item.maxQuantity) {
      item.defaultValue++;
    }
  }

  decrementQuantity(item: any): void {
    if (item.defaultValue > 1) {
      item.defaultValue--;
    }
  }


  addThisAddsOn(data: any) {
    const notInvoicedItems = this.SubscriptionAddsOn.filter((item:any) => item.isInvoiced === false);
    if(notInvoicedItems.length >= this.addsOn.length) {
      this.showfail("Please Pay Pending AddsOn To Continue...");
    }else{
      var Ftr = "";
      if(data.type == 1)
        {
          Ftr = "Feature";
        }else{
          Ftr = "PlanAddOn";
        }
      this.addThisFeature = {
        "qty": data.defaultValue,
        "unitPrice": data.pricePerUnit,
        "totalPrice": data.defaultValue * data.pricePerUnit,
        "endDate": data.planEndDate,
        "comments": "No comments",
        "userId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId"))),
        "tenantId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("tenantId"))),
        "subscriptionId": this.planDetails.subscriptionId,
        "featureType": Ftr,
        "featureId": parseInt(data.featureId),
        "planAddOnsId": parseInt(data.id)
      }
        this._ManagmentService.addNewAddsOn(this.addThisFeature).subscribe({
          next: (data) => {
            this.showSuccess(data.result.featureDescription + " AddsOn added successfully")
          },
          error: (error) => {
            // console.log(error);
            this.showfail("Couldn't add this feature, Contact Customer Service")
          },
          complete: () => {
            this.getAddsOn();
          }
        }
      )
    }
  }

  payAddOn(paymentData:any){

    this.payAddsOn = {
        "subscriptionAddOnId": paymentData.id,
        "domainName": this.url
      }
    // console.log(this.payAddsOn);
    this._ManagmentService.payNewAddOn(this.payAddsOn).subscribe(
      {
        next: (data) => {
          // console.log(data)
          // this.showSuccess(data.result.message)
          window.location.href = data.result.data.invoiceURL
        },
        error: (error) => {
          // console.log(error)
           this.showfail("Couldn't delete this row, Contact Customer Service")
        },
        complete: () => {
          this.getAddsOn();
        }}
    )
  }

  deletePendingAddOn(deleteAddsOn: any){
    // console.log(deleteAddsOn);
    this.deleteAddsOn = {
      "subscriptionAddsOnId": deleteAddsOn.id,
      "userId": parseInt(this._EncryptDecryptService.decryptUsingAES256(localStorage.getItem("userId"))),
    }
    this._ManagmentService.deletePendingAddOn(this.deleteAddsOn).subscribe({
      next: (data) => {
        this.showSuccess(data.result)
      },
      error: (error) => {
        this.showfail("Couldn't delete this row, Contact Customer Service")
      },
      complete: () => {
        this.getAddsOn();
      }});
  }
}
