import { Routes } from "@angular/router";
import { HomeComponent, AboutComponent } from "./home";
import { AuthGuard, RegisterComponent, SignInComponent } from '../jam/auth';
import { DatabaseGuard } from "../jam/firestore";

export const appRoutes: Routes = [
    {
        path: '', canActivate: [ DatabaseGuard ], children: [
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'sign-in', component: SignInComponent },
            { path: 'user', loadChildren: './user/user.module#UserModule', canLoad: [ DatabaseGuard ], canActivate: [ AuthGuard ] },
            { path: 'company', loadChildren: './company/company.module#CompanyModule', canLoad: [ DatabaseGuard ], canActivate: [ AuthGuard ] }
        ]
    }
];
