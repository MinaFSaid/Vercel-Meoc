export interface CreateSubscription {
    "subscriptionId": number;
    "userId": number;
    "totalSubscriptionPrice": number;
    "totalSubscriptionMonths": number;
    "isAutoRenew": boolean;
    "tenantId": number;
    "currencyId": number;
    "countryId": number;
    "planId": number;
    "planPricingId": number;
    "features": Feature[];
  }
  
  export interface Feature {
    "featureId": number;
    "doctorQuantity": number;
    "clinicQuantity": number;
  }
