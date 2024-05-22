import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AskedQuestionsComponent } from './Components/Public-Sector/asked-questions/asked-questions.component';
import { CustResultComponent } from './Components/Public-Sector/cust-result/cust-result.component';
import { DifferenceComponent } from './Components/Public-Sector/difference/difference.component';
import { GetStartedComponent } from './Components/Public-Sector/get-started/get-started.component';
import { HowItWorkComponent } from './Components/Public-Sector/how-it-work/how-it-work.component';
import { KeyBenefitsComponent } from './Components/Public-Sector/key-benefits/key-benefits.component';
import { OurfeaturesComponent } from './Components/Public-Sector/ourfeatures/ourfeatures.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactUsComponent } from './Components/Public-Sector/contact-us/contact-us.component';
import { DownloadNowComponent } from './Components/Public-Sector/download-now/download-now.component';
import { FooterComponent } from './Components/Public-Sector/Shared/footer/footer.component';
import { NavbarComponent } from './Components/Public-Sector/Shared/navbar/navbar.component';
import { PublicLayoutComponent } from './Components/Public-Sector/public-layout/public-layout.component';
import { NotFoundComponent } from './Components/SharedPages/not-found/not-found.component';
import { SignInComponent } from './Components/Public-Sector/sign-in/sign-in.component';
import { RegisterComponent } from './Components/Public-Sector/register/register.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageLayoutComponent } from './Components/Public-Sector/landing-page-layout/landing-page-layout.component';
import { PlansPricesComponent } from './Components/Public-Sector/plans-prices/plans-prices.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { SysSidebarComponent } from './Components/Private-Sector/sys-sidebar/sys-sidebar.component';
import { EditProfileComponent } from './Components/Private-Sector/edit-profile/edit-profile.component';
import { InitDataService } from './Components/Services/init-data.service';
import { PlanBillingComponent } from './Components/Private-Sector/plan-billing/plan-billing.component';
import { ReceiptsComponent } from './Components/Private-Sector/receipts/receipts.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PlanCustomizationComponent } from './Components/Public-Sector/plan-customization/plan-customization.component';
import { AuthService } from '../app/Components/Services/auth.service'; // Import AuthService
import { AuthGuard } from './Components/guards/auth.guard';
import { ReceiptDetailsComponent } from './Components/Private-Sector/receipt-details/receipt-details.component'; // Import AuthGuard

@NgModule({
  declarations: [
    AppComponent,
    AskedQuestionsComponent,
    CustResultComponent,
    DifferenceComponent,
    GetStartedComponent,
    HowItWorkComponent,
    KeyBenefitsComponent,
    OurfeaturesComponent,
    ContactUsComponent,
    DownloadNowComponent,
    FooterComponent,
    NavbarComponent,
    PublicLayoutComponent,
    NotFoundComponent,
    SignInComponent,
    RegisterComponent,
    LandingPageLayoutComponent,
    PlansPricesComponent,
    SysSidebarComponent,
    EditProfileComponent,
    PlanBillingComponent,
    ReceiptsComponent,
    PlanCustomizationComponent,
    ReceiptDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    FormsModule,
    CarouselModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    InitDataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (_InitDataService: InitDataService) => () => _InitDataService.initialize(),
      deps: [InitDataService],
      multi: true
    },
    AuthService, // Add AuthService to providers
    AuthGuard // Add AuthGuard to providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


