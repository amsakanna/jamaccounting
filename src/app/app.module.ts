/*    Framework Modules    */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatSelectModule,
	MatOptionModule,
	MatStepperModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTooltipModule
} from '@angular/material';

/*    3rd Party Modules    */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

/*    My Library Modules    */
import { JamAuthModule } from "../jam-auth/jam-auth";
import { JamEventManagerModule } from '../jam-event-manager/jam-event-manager';
import { JamFirestoreModule } from "../jam-firestore/jam-firestore";

/*    Environment variables    */
import { database } from "../environments/environment";

/*    Router Module    */
import { AppRouterModule } from './app.router.module';

/*    App Main Services    */
import { AuthGuard, DatabaseGuard, UserGuard } from './services/guard.service';
import { DatabaseService } from './services/database.service';
import { Navigator } from './services/navigator.service';
import { InterfaceMetaService } from './services/meta.service';

/*    App Services    */
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { InventoryService } from './services/inventory.service';

/*    App Components    */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { JamMenuComponent } from './jam-menu/jam-menu.component';
import { JamTreeComponent } from './jam-tree/jam-tree.component';
import { JamAccordionComponent } from './jam-accordion/jam-accordion.component';
import { JamAccordionItemComponent } from './jam-accordion-item/jam-accordion-item.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountTreeComponent } from './account-tree/account-tree.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { JamTreeListComponent } from './jam-tree-list/jam-tree-list.component';
import { JamListComponent } from './jam-list/jam-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { JamExplorerComponent } from './jam-explorer/jam-explorer.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { CompanyComponent } from './company/company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { JamXboxMenuComponent } from './jam-xbox-menu/jam-xbox-menu.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CompaniesComponent } from './companies/companies.component';
import { JamHorizontalListComponent } from './jam-horizontal-list/jam-horizontal-list.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AccountComponent,
		JamMenuComponent,
		JamTreeComponent,
		JamAccordionComponent,
		JamAccordionItemComponent,
		AccountPageComponent,
		AccountFormComponent,
		AccountTreeComponent,
		InventoryPageComponent,
		InventoryComponent,
		InventoryFormComponent,
		JamTreeListComponent,
		JamListComponent,
		SignInComponent,
		RegisterComponent,
		CompanyPageComponent,
		JamExplorerComponent,
		ContactComponent,
		PricingComponent,
		UserPageComponent,
		AboutPageComponent,
		PricingPageComponent,
		CompanyComponent,
		CompanyFormComponent,
		ProfilePageComponent,
		MyPlanComponent,
		JamXboxMenuComponent,
		SettingsPageComponent,
		CompaniesComponent,
		JamHorizontalListComponent
	],
	imports: [
		BrowserModule,
			BrowserAnimationsModule,
		MatIconModule,
			MatButtonModule,
			MatInputModule,
			MatSelectModule,
			MatOptionModule,
			MatStepperModule,
			MatDatepickerModule,
			MatNativeDateModule,
			MatTooltipModule,
		FormsModule,
			ReactiveFormsModule,
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
			AngularFireAuthModule,
			AngularFirestoreModule,
			AngularFireDatabaseModule,
		AppRouterModule,
		JamAuthModule.forRoot(),
		JamEventManagerModule.forRoot(),
		JamFirestoreModule.forRoot( database.jamFireStoreConfig )
	],
	providers: [
		AngularFireDatabase,
		AuthGuard,
			DatabaseGuard,
			UserGuard,
		DatabaseService,
		Navigator,
		InterfaceMetaService,
		AccountService,
			InventoryService,
			UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
