import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdButtonModule, MdInputModule, MdSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { database } from "../environments/environment";

import { AppRouterModule } from './app.router.module';
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
import { JamExplorerComponent } from './jam-explorer/jam-explorer.component';
import { JamListComponent } from './jam-list/jam-list.component';

import { AccountService } from './services/account.service';
import { InventoryService } from './services/inventory.service';

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
		JamExplorerComponent,
		JamListComponent		
	],
	imports: [
		BrowserModule,
			BrowserAnimationsModule,
		MdIconModule,
			MdButtonModule,
			MdInputModule,
			MdSelectModule,
		FormsModule,
			ReactiveFormsModule,
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
			AngularFireAuthModule,
			AngularFireDatabaseModule,
		AppRouterModule
	],
	providers: [
		AccountService,
		InventoryService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
