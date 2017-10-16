import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AppRouterModule } from './app.router.module';

import { JamAuthModule } from "../jam-auth/jam-auth";
import { JamEventManagerModule } from '../jam-event-manager/jam-event-manager';
import { JamFirestoreModule, IJamFireStoreConfig } from "../jam-firestore/jam-firestore";

import { database } from "../environments/environment";

import { DatabaseService } from './services/database.service';
import { DataService } from './services/data.service';
import { AuthGuard, DatabaseMetaGuard } from './services/guard.service';
import { Navigator } from './services/navigator.service';
import { DatabaseMetaService } from './services/meta.service';
import { CompanyService } from './services/all-data.service';
import { AccountService } from './services/account.service';
import { InventoryService } from './services/inventory.service';

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

import { Tables } from './models/tables.model';

const jamFireStoreConfig: IJamFireStoreConfig = {
	databaseMetadataPath: ''
};

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
		CompaniesComponent
	],
	imports: [
		BrowserModule,
			BrowserAnimationsModule,
		MatIconModule,
			MatButtonModule,
			MatInputModule,
			MatSelectModule,
		FormsModule,
			ReactiveFormsModule,
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
			AngularFireAuthModule,
			AngularFirestoreModule,
			AngularFireDatabaseModule,
		AppRouterModule,
		JamAuthModule.forRoot(),
		JamEventManagerModule.forRoot(),
		JamFirestoreModule.forRoot( jamFireStoreConfig )
	],
	providers: [
		AngularFireDatabase,
		DatabaseService,
		DataService,
		AuthGuard,
			DatabaseMetaGuard,
		Navigator,
		DatabaseMetaService,
		AccountService,
			InventoryService,
			CompanyService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
