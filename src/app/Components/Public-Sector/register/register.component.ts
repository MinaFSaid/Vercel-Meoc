import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    phone: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    userName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  });

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router,  private toastr: ToastrService) {
    // Listen for changes in the 'name' field
    this.signUpForm.get('name')?.valueChanges.subscribe((nameValue) => {
      // Update the 'userName' field with the same value as 'name'
      this.signUpForm.get('userName')?.setValue(nameValue);
    });
  }

  showSuccess(msg:string) {
    this.toastr.success(msg, "",{
      timeOut: 1000,
      progressBar :true,
      titleClass:"Mina"
    });
  }
  showfail(msg:string) {
    this.toastr.error(msg, "",{
      timeOut: 1000,
      progressBar :true,
    });
  }

  toggleShowPassword() {
    this.togglePassword = !this.togglePassword;
  }

  handleSignUp(signUpForm: FormGroup) {
    
    this.errorDetails = '';
    this.isLoading = true;

    if (signUpForm.valid) {
      this._AuthenticationService.signUpAuth(signUpForm.value).subscribe({
        next: (data) => {
          if (data.success) {
            console.log(data);
            this.isLoading = false;
            this.showSuccess("Success");
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          console.log(err);
          this.showfail("Error");
        },
      })
    } else {
      this.isLoading = false;
      // console.log(signUpForm);
    }
  }
}
