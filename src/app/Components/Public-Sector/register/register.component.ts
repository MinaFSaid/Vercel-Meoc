import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading: boolean = false;
  errorDetails: string = '';
  togglePassword: boolean = false;

  signUpForm: FormGroup = new FormGroup({
    emailAddress: new FormControl(null,[Validators.required,Validators.email]),
    name: new FormControl(null,[Validators.required,Validators.minLength(3)]),  
    password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    phone: new FormControl(null,[Validators.required]),
    userName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  });

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {
    // Listen for changes in the 'name' field
    this.signUpForm.get('name')?.valueChanges.subscribe((nameValue) => {
      // Update the 'userName' field with the same value as 'name'
      this.signUpForm.get('userName')?.setValue(nameValue);
    });
  }

  showSuccess(msg:string) {
    Swal.fire({
      title: msg,
      text: "Welcome...",
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


  toggleShowPassword() {
    this.togglePassword = !this.togglePassword;
  }

  handleSignUp(signUpForm: FormGroup) {
    
    this.errorDetails = '';
    this.isLoading = true;


      this._AuthenticationService.signUpAuth(signUpForm.value).subscribe({
        next: (data) => {
          if (data.success) {
            console.log(data);
            this.isLoading = false;
            this.showSuccess("Registration Success");
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          console.log(err);
          this.showfail(err.error.error.message);
        },
      })

  }
}
