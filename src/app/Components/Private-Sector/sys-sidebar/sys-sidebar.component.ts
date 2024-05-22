import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-sys-sidebar',
  templateUrl: './sys-sidebar.component.html',
  styleUrl: './sys-sidebar.component.css'
})
export class SysSidebarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private _AuthenticationService: AuthenticationService){}

  ngOnInit(): void {
    // Subscribe to userAccessData changes
    this._AuthenticationService.getUserAccessData().subscribe((accessToken) => {
      this.isLogin = !!accessToken;
    });
  }


  logout(): void {
    this._AuthenticationService.logout();
  }
}
