import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { RegisterComponent } from "./register/register.component";
import { PricingPageComponent } from "./pricing-page/pricing-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { CompanyPageComponent } from "./company-page/company-page.component";
import { CompanyComponent } from "./company/company.component";
import { CompanyFormComponent } from "./company-form/company-form.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { MyPlanComponent } from "./my-plan/my-plan.component";

import { AccountPageComponent } from "./account-page/account-page.component";
import { AccountComponent } from "./account/account.component";
import { AccountFormComponent } from "./account-form/account-form.component";
import { InventoryPageComponent } from "./inventory-page/inventory-page.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { InventoryFormComponent } from "./inventory-form/inventory-form.component";

import { AuthGuard, DatabaseGuard, UserGuard } from "./services/guard.service";
import { SettingsPageComponent } from "./settings-page/settings-page.component";
import { CompaniesComponent } from "./companies/companies.component";

const appRoutes: Routes = [
    { path: '', canActivate: [DatabaseGuard], children: [

        { path: '', component: HomeComponent },
        { path: 'about', component: AboutPageComponent },
        { path: 'sign-in', component: SignInComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'pricing', component: PricingPageComponent },
        { path: 'user', component: UserPageComponent, canActivate: [AuthGuard, UserGuard], children: [
            { path: '', component: ProfilePageComponent },
            { path: 'companies/@new', component: CompanyFormComponent },
            { path: 'companies', component: CompaniesComponent},
            { path: 'my-plan', component: MyPlanComponent },
        ]},
        { path: 'company/:company', component: CompanyComponent, canActivate: [AuthGuard, UserGuard], children: [
            { path: 'settings', component: SettingsPageComponent },
            { path: 'accounts', component: AccountPageComponent, children: [
                { path: '@new', component: AccountFormComponent },
                { path: ':account', component: AccountComponent },
                { path: ':account/edit', component: AccountFormComponent }
            ]},
            { path: 'inventory', component: InventoryPageComponent, children: [
                { path: ':key', component: InventoryComponent },
                { path: ':key/edit', component: InventoryFormComponent }
            ]}
        ]},


    ] }
];

export const AppRouterModule = RouterModule.forRoot( appRoutes );
