import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutPageComponent } from "./home/about-page.component";
import { AuthGuard, RegisterComponent, SignInComponent } from '../jam/auth';
import { DatabaseGuard } from "../jam/firestore";

export const appRoutes: Routes = [
    {
        path: '', canActivate: [ DatabaseGuard ], children: [
            { path: '', component: HomeComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'sign-in', component: SignInComponent },
            { path: 'about', component: AboutPageComponent },
            { path: 'user', loadChildren: './user/user.module#UserModule', canLoad: [ DatabaseGuard ], canActivate: [ AuthGuard ] },
            { path: 'company', loadChildren: './company/company.module#CompanyModule', canLoad: [ DatabaseGuard ], canActivate: [ AuthGuard ] }
        ]
    }
];
