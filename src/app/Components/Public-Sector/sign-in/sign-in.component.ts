import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { InitDataService } from '../../Services/init-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  isLoading: boolean = false;
  errorDetails: string = '';
  togglePassword: boolean = false;

  signInForm: FormGroup = new FormGroup({
    userNameOrEmailAddress: new FormControl(null, {validators: [Validators.required]}),
    password: new FormControl(null, {validators: [Validators.required]}),
    rememberClient: new FormControl(true),
  });

  constructor(private _AuthenticationService: AuthenticationService,
              private _Router: Router,
              private toastr: ToastrService,
              private _InitDataService:InitDataService,
              private _EncryptDecryptService:EncryptDecryptService) {this._InitDataService.initialize();}

  showSuccess(msg:string) {
    Swal.fire({
      title: msg,
      text: "Welcome...",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(() => {
      this._Router.navigate(['/home']);
    }, 1500);
    
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

  toggleShowPassword(){
    this.togglePassword = !this.togglePassword;
  }

  handleSignIn(signInForm: FormGroup) {
    this.errorDetails = '';
    this.isLoading = true;
    if (signInForm.valid) {
      this._AuthenticationService.signInAuth(signInForm.value).subscribe({
        next: (data) => {
          if (data.success) {
            // console.log(data);
            this.isLoading = false;
            this.showSuccess('Login successfuly');
            localStorage.setItem('userId',this._EncryptDecryptService.encryptUsingAES256(data.result.userId));
            localStorage.setItem('accessToken', data.result.accessToken);
            this._AuthenticationService.userAccessData.next(data.result.accessToken);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorDetails = err.error.error.details;
        //  console.log(err);
          this.showfail("Login Faild  " + this.errorDetails)
        },
      })
    }else{
      this.isLoading = false;
    }
  }
}
