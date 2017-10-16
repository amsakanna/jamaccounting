import { ReplaySubject } from "rxjs/ReplaySubject";

export const enum MyEvents {
    None = '',
    HomeRequested = 'HomeRequested',
    PricingRequested = 'PricingRequested',
    RegisterPageRequested = 'RegisterPageRequested',
    SignInPageRequested = 'SignInPageRequested',
    UserRequested = 'UserRequested',
    CompaniesRequested = 'CompaniesRequested',
    ProfileRequested = 'ProfileRequested',
    MyPlanRequested = 'MyPlanRequested',
    SettingsRequested = 'SettingsRequested',
    AccountsRequested = 'AccountsRequested',
    InventoryRequested = 'InventoryRequested',
    VouchersRequested = 'VouchersRequested'
}

export enum MyEventTypes
{
    None = ''
}