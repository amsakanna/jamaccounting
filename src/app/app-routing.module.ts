import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutPageComponent } from "./home/about-page.component";
import { AuthGuard, RegisterComponent, SignInComponent } from '../jam-auth/jam-auth';
import { DatabaseGuard } from "./shared/database-guard.service";

const appRoutes: Routes = [
    {
        path: '', canActivate: [ DatabaseGuard ], children: [
            { path: '', component: HomeComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'sign-in', component: SignInComponent },
            { path: 'about', component: AboutPageComponent },
            { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [ AuthGuard ] },
            { path: 'company', loadChildren: './company/company.module#CompanyModule', canActivate: [ AuthGuard ] }
        ]
    }
];

@NgModule( {
    imports: [ RouterModule.forRoot( appRoutes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule { }

// , children: [
//     { path: 'settings', component: SettingsPageComponent },
//     { path: 'accounts', loadChildren: './account/account.module#AccountModule' },
//     {
//         path: 'inventory', component: InventoryPageComponent, children: [
//             { path: ':key', component: InventoryComponent },
//             { path: ':key/edit', component: InventoryFormComponent }
//         ]
//     }
// ]