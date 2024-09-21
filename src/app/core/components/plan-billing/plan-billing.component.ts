import { Component, ɵɵqueryRefresh } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { SharedCoreService } from '../../services/sharedCore.service';

@Component({
  selector: 'app-plan-billing',
  templateUrl: './plan-billing.component.html',
  styleUrl: './plan-billing.component.css'
})
export class PlanBillingComponent {
  subscriptions: any = [];
  isBill: boolean = false;
  isBills: boolean = true;
  iframeUrl: string | null = null;
  url: any;
  user:any;
  constructor(private _SubscriptionService: SubscriptionService, private _Router: Router,private _SharedCoreService:SharedCoreService) {
    this.loadData();
    this.url = window.location.origin + "/profile/payment-response";
  }

  loadData() {
    this._SubscriptionService.getSubscriptions().subscribe((subscript) => {
      this.subscriptions = subscript.result
      this.subscriptions.reverse();
      if (this.subscriptions.length > 0) {
        this.isBill = true;
      } else {
        this.isBill = false;
      }
    })
  }

  getThisPlan(data: any) {
    this._SubscriptionService.getPlanDetails(data);
    this._Router.navigate(['/profile/subscription-managment']);
  }

  assignUsers(data: any) {
    this._SubscriptionService.assignUsers(data);
    this._Router.navigate(['/profile/assign-users']);
  }
  getReceiptDetails(data: any) {
    this._SubscriptionService.getReceiptDetails(data);
    this._Router.navigate(['/profile/receipt']);
  }


  deleteSubscription(id: any, i: any) {
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
        // console.log('Delete request completed.');
      }
    })
  }

  showSuccess(msg: string) {
    Swal.fire({
      title: msg,
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(() => {
    }, 1500);
  }

  showDelete(id: any, i: any) {
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
        this.deleteSubscription(id, i);
      }
    });
  }

  showfail(msg: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
      showConfirmButton: false,
      timer: 2000
    });
  }

  openPopup(url: string): void {
    const width = 1600;
    const height = 900;
    const left = (screen.width) - (width / 2);
    const top = (screen.height) - (height / 2);

    window.open(url, 'popup', `width=${width},height=${height},top=${top},left=${left}`);
  }

  openUrlInIframe(url: string): void {
    this.iframeUrl = url;
  }

  paySubscription(sub: any) {
    this._SharedCoreService.getUserData().subscribe(data => {
      if (!data.result.userId || !data.result.emailAddress || !data.result.userName ||
        data.result.isActive === null || !data.result.fullName || 
        !data.result.phoneNumber || data.result.gender === null || 
        !data.result.altEmail || !data.result.phoneNumber2 || 
        !data.result.birthDate || !data.result.firstName || 
        !data.result.familyName || !data.result.governorate || !data.result.address) {

          
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please fill in all user information to continue",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
          this._Router.navigate(['/profile/edit-Profile']);
        });
          

        }else{
          this._SubscriptionService.PaySubscriptions(sub, this.url).subscribe((data) => {
            window.location.href = data.result.data.invoiceURL
          })
        }
    })
   
  }

}
