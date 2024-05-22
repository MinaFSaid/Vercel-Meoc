import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './Components/Public-Sector/public-layout/public-layout.component';
import { NotFoundComponent } from './Components/SharedPages/not-found/not-found.component';
import { SignInComponent } from './Components/Public-Sector/sign-in/sign-in.component';
import { RegisterComponent } from './Components/Public-Sector/register/register.component';
import { LandingPageLayoutComponent } from './Components/Public-Sector/landing-page-layout/landing-page-layout.component';
import { PlansPricesComponent } from './Components/Public-Sector/plans-prices/plans-prices.component';
import { SysSidebarComponent } from './Components/Private-Sector/sys-sidebar/sys-sidebar.component';
import { EditProfileComponent } from './Components/Private-Sector/edit-profile/edit-profile.component';
import { PlanBillingComponent } from './Components/Private-Sector/plan-billing/plan-billing.component';
import { ReceiptsComponent } from './Components/Private-Sector/receipts/receipts.component';
import { PlanCustomizationComponent } from './Components/Public-Sector/plan-customization/plan-customization.component';
import { AuthGuard } from './Components/guards/auth.guard';
import { ReceiptDetailsComponent } from './Components/Private-Sector/receipt-details/receipt-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '', component: PublicLayoutComponent,children:[
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component: LandingPageLayoutComponent},
    {path: 'Plans', component: PlansPricesComponent},
    {path: 'Plan/:id', component: PlanCustomizationComponent ,canActivate: [AuthGuard]},
  ]},
  {path: 'signin', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: SysSidebarComponent,canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'edit-Profile', pathMatch:'full'},
    {path: 'edit-Profile', component: EditProfileComponent},
    {path: 'plan-Billing', component: PlanBillingComponent},
    {path: 'receipts', component: ReceiptsComponent},
    {path: 'receipt', component: ReceiptDetailsComponent},
  ]},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
