import { Component, ɵɵqueryRefresh } from '@angular/core';
import { SubscriptionService } from './../../Services/subscription.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-plan-billing',
  templateUrl: './plan-billing.component.html',
  styleUrl: './plan-billing.component.css'
})
export class PlanBillingComponent {
  subscriptions:any = [];
  isBill:boolean = false;
constructor(private _SubscriptionService:SubscriptionService, private _Router: Router,){
 this.loadData();
}

loadData(){
  this._SubscriptionService.getSubscriptions().subscribe((subscript) => {
    this.subscriptions = subscript.result
    this.subscriptions.reverse();
    if(this.subscriptions.length > 0){
      this.isBill = true;
    }else{
      this.isBill = false;
    }
  })
}

getThisPlan(data: any) {
  this._SubscriptionService.getPlanDetails(data);
  this._Router.navigate(['/profile/subscription-managment']);
}

assignUsers(data:any) {
  this._SubscriptionService.assignUsers(data);
  this._Router.navigate(['/profile/assign-users']);
}
getReceiptDetails(data:any) {
  this._SubscriptionService.getReceiptDetails(data);
  this._Router.navigate(['/profile/receipt']);
}


deleteSubscription(id:any, i:any){
  this._SubscriptionService.deletePendingSubscriptions(id).subscribe({
    next: (data) => {
      this.subscriptions.splice(i, 1);
      this.showSuccess("Subscription Deleted Successfully")
      this.loadData()
    },
    error: (error) => {
      this.showfail("Can't Delete This Subscription")
    },
    complete: () => {
      console.log('Delete request completed.');
    }
  })
}

showSuccess(msg:string) {
  Swal.fire({
    title: msg,
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(() => {
  }, 1500);
}

showDelete(id:any, i:any){
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this subscription!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete"
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteSubscription(id,i);
    }
  });
}

showfail(msg:string) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    showConfirmButton: false,
    timer: 2000
  });
}

paySubscription(sub:any, i:any){
  this._SubscriptionService.PaySubscriptions(sub).subscribe((data)=>{
    this.loadData();
  })
}

}
