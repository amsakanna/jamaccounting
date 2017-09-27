import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AccountPageComponent } from "./account-page/account-page.component";
import { AccountComponent } from "./account/account.component";
import { AccountFormComponent } from "./account-form/account-form.component";
import { InventoryPageComponent } from "./inventory-page/inventory-page.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { InventoryFormComponent } from "./inventory-form/inventory-form.component";

const appRoutes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomeComponent, children: [
        { path: '', redirectTo: 'inventory', pathMatch: 'full' },
        { path: 'accounts', component: AccountPageComponent, children: [
            { path: ':key', component: AccountComponent },
            { path: ':key/edit', component: AccountFormComponent }
        ] },
        { path: 'inventory', component: InventoryPageComponent, children: [
            { path: ':key', component: InventoryComponent },
            { path: ':key/edit', component: InventoryFormComponent }
        ] }
    ] }
];

export const AppRouterModule = RouterModule.forRoot( appRoutes );
