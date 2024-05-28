import { Component } from '@angular/core';
import { SubscriptionService } from './../../Services/subscription.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrl: './assign-users.component.css'
})
export class AssignUsersComponent {
  clinicCode: any = [];
  userRoles: any = [];
  clinicUsers: any = [];
  selectedClinicId: number | null = null;
  selectedRoleId: number | null = null;
  email: string = "";
  userdata: any;
  id: any;

  constructor(private _SubscriptionService: SubscriptionService, private _Router:Router) {
    this.userdata = this._SubscriptionService.UsersData;
    this.id = this.userdata.subscriptionId;
    if (this.isDataEmpty(this.userdata)) {
      this._Router.navigate(['/profile/plan-Billing']);
    }else{
      this.GetSubscriptionClinics(this.id);
      this.GetUserRolesClinic();
    }
  }

  isDataEmpty(data: any): boolean {
    return data === null || data === undefined || Object.keys(data).length === 0;
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

  GetSubscriptionClinics(id: any) {
    this._SubscriptionService.GetSubscriptionClinics(id).subscribe((data) => {
      // console.log(data.result.clinicCodes);
      this.clinicCode = data.result.clinicCodes;
    })
  }

  GetUserRolesClinic() {
    this._SubscriptionService.GetUserRolesClinic().subscribe((data) => {
      // console.log(data);
      this.userRoles = data.result;
      this.userRoles.reverse();
    })
  }

  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRoleId = Number(selectElement.value);
    // console.log(this.selectedRoleId);
  }

  onClinicChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedClinicId = Number(selectElement.value);
    // console.log(this.selectedClinicId);
    
    this.getUsersClinic(this.selectedClinicId);
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
    // console.log(this.email);
  }

  addUser() {
    if (this.email && this.selectedClinicId && this.selectedRoleId != null) {
      this._SubscriptionService.AssignUserToClinic(this.email, this.selectedClinicId, this.selectedRoleId).subscribe({
        next: (data) => {
          // console.log(data.result);
          this.showSuccess(data.result)
          this.getUsersClinic(this.selectedClinicId);
        },
        error: (error) => {
          this.showfail(error.error.result)
        },
        complete: () => {
          // console.log('Delete request completed.');
        }
      })
    } else {
      this.showfail("Please Select All Required Fields")
    }

  }

  getUsersClinic(id: any) {
    this._SubscriptionService.GetClinicUsers(id).subscribe((users) => {
      console.log(users)
      this.clinicUsers = users.result.reverse();
    })
  }

  deleteUser(id:any){
    this._SubscriptionService.deleteUserFromClinic(id,this.selectedClinicId).subscribe((data)=>{
      console.log(data.result);
      this.showSuccess(data.result);
      this.getUsersClinic(this.selectedClinicId);
    })
  }

  showDelete(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user from clinic!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(id);
      }
    });
  }


  isModalVisible: boolean = false;
  modalUserName:any;
  showModal(name:any) {
    this.modalUserName = name;
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  accept() {
    // Handle accept action
    this.hideModal();
  }

  decline() {
    // Handle decline action
    this.hideModal();
  }
}
