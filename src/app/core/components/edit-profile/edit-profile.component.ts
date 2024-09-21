import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms'
import { SharedCoreService } from '../../services/sharedCore.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  userData: any = {};
  isloading:boolean = false;
  isChecked:boolean = true;
  isDisabled = true;

  selectedDate: Date; // Assuming you have this property to hold the selected date

  editProfileData: FormGroup = new FormGroup({
    userId: new FormControl(null),
    mail: new FormControl({disabled: true}),
    fullName: new FormControl(null),
    userName: new FormControl({value:null,disabled: true}),
    photoPath: new FormControl(null),
    isActive: new FormControl(null),
    phone: new FormControl(null),
    gender: new FormControl(null),
    altMail: new FormControl(null),
    phone2: new FormControl(null),
    birthDate: new FormControl(null),
    firstName: new FormControl(null),
    familyName: new FormControl(null),
    governorate: new FormControl(null),
    address: new FormControl(null),
    jobId: new FormControl(null),
  });

  changeUserPassword: FormGroup = new FormGroup({
    currentPassword: new FormControl(null),
    newPassword: new FormControl(null),
  });

  constructor(private _SharedService: SharedCoreService, private datePipe: DatePipe) {
    this.selectedDate = new Date();
  }

  getUserData(){
    this._SharedService.getUserData().subscribe({
      next: (data) => {
        this._SharedService.currentUserData = data.result;
         //console.log(data.result) //dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        this.userData = data.result;
        const formattedBirthDate = this.userData.birthDate ? new Date(this.userData.birthDate) : null;
        if(this.userData.gender == 0){
          this.isChecked = true;
        }else{
          this.isChecked = false;
        }
        this.editProfileData.setValue({
          userId: this.userData.userId,
          mail: this.userData.emailAddress,
          fullName: this.userData.fullName,
          photoPath: this.userData.photoPath,
          phone: this.userData.phoneNumber,
          gender: this.userData.gender,
          userName: this.userData.userName,
          isActive: this.userData.isActive,
          altMail: this.userData.altEmail,
          phone2: this.userData.phoneNumber2,
          birthDate: formattedBirthDate,
          firstName: this.userData.firstName,
          familyName: this.userData.familyName,
          governorate: this.userData.governorate,
          address: this.userData.address,
          jobId: this.userData.jobId,
        });
        this.isloading = true;
       
      },
      error: (err) => { this.showfail(err.error.error.message) }
    })
  }

  UserDataPicker(userdata:any){
    const [day, month, year] = userdata.split('-');
    const formattedDate = new Date(`${month}/${day}/${year}`);
    this.selectedDate = formattedDate
    return this.selectedDate;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  showSuccess() {
    Swal.fire({
      title: "Saved Success",
      text: "Your Profile Data Updated Successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
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

  update() {
    console.log(this.editProfileData.value)
    this._SharedService.updateUserData(this.editProfileData.value).subscribe({
      next:(data)=>{this.showSuccess();},
      error:(err)=>{this.showfail(err.error.error.message);},
    })
    
  }
}
