import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/components/home/home.component';
import { PlansPricesComponent } from './public/components/plans-prices/plans-prices.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { InitDataService } from './shared/services/init-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './public/components/layout/layout.component';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { PlanCustomizationComponent } from './public/components/plan-customization/plan-customization.component';
import { SignInComponent } from './public/components/sign-in/sign-in.component';
import { RegisterComponent } from './public/components/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AssignUsersComponent } from './core/components/assign-users/assign-users.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { PlanBillingComponent } from './core/components/plan-billing/plan-billing.component';
import { ReceiptDetailsComponent } from './core/components/receipt-details/receipt-details.component';
import { ReceiptsComponent } from './core/components/receipts/receipts.component';
import { SubscriptionManagmentComponent } from './core/components/subscription-managment/subscription-managment.component';
import { SysSidebarComponent } from './core/components/sys-sidebar/sys-sidebar.component';
import { DatePipe } from '@angular/common';
import { IframeContainerComponent } from './core/components/iframe-container/iframe-container.component';
import { PaymentResponseComponent } from './core/components/payment-response/payment-response.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlansPricesComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    PlanCustomizationComponent,
    SignInComponent,
    RegisterComponent,
    NotFoundComponent,
    AssignUsersComponent,
    EditProfileComponent,
    PlanBillingComponent,
    ReceiptDetailsComponent,
    ReceiptsComponent,
    SubscriptionManagmentComponent,
    SysSidebarComponent,
    IframeContainerComponent,
    PaymentResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([], routerOptions)
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService, // Add AuthService to providers
    AuthGuard, // Add AuthGuard to providers
    InitDataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (_InitDataService: InitDataService) => () => _InitDataService.initialize(),
      deps: [InitDataService],
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
