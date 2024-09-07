import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './public/components/layout/layout.component';
import { PlansPricesComponent } from './public/components/plans-prices/plans-prices.component';
import { HomeComponent } from './public/components/home/home.component';
import { PlanCustomizationComponent } from './public/components/plan-customization/plan-customization.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignInComponent } from './public/components/sign-in/sign-in.component';
import { RegisterComponent } from './public/components/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SysSidebarComponent } from './core/components/sys-sidebar/sys-sidebar.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { PlanBillingComponent } from './core/components/plan-billing/plan-billing.component';
import { ReceiptsComponent } from './core/components/receipts/receipts.component';
import { ReceiptDetailsComponent } from './core/components/receipt-details/receipt-details.component';
import { SubscriptionManagmentComponent } from './core/components/subscription-managment/subscription-managment.component';
import { AssignUsersComponent } from './core/components/assign-users/assign-users.component';
import { PaymentResponseComponent } from './core/components/payment-response/payment-response.component';
import { AddsonPaymentresponseComponent } from './core/components/addson-paymentresponse/addson-paymentresponse.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '', component: LayoutComponent,children:[
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
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
    {path: 'subscription-managment', component: SubscriptionManagmentComponent},
    {path: 'assign-users', component: AssignUsersComponent},
    {path: 'payment-response', component: PaymentResponseComponent},
    {path: 'addsOnpayment-response', component: AddsonPaymentresponseComponent},

  ]},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
