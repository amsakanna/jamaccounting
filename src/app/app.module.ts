/*    Framework Modules    */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import
{
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/*    My Library Modules    */
import { JamModelLibraryModule } from '../jam-model-library/jam-model-library';
import { JamFirestoreModule } from "../jam-firestore/jam-firestore";
import { JamAuthModule } from "../jam-auth/jam-auth";
import { JamNavigatorModule } from '../jam-navigator/jam-navigator';
import { JamEventManagerModule } from '../jam-event-manager/jam-event-manager';
import
{
	JamAccordionItemModule,
	JamListModule,
	JamTreeModule,
	JamTreeListModule,
	JamXboxMenuModule,
	JamExplorerModule
} from '../jam-ui-library/jam-ui-library';

/*    Environment variables    */
import { database, environment } from "../environments/environment";

/*    Router Module    */
import { AppRoutingModule } from './app-routing.module';

/*    App Module    */
import { AccountModule } from "./account/account.module";

/*    App Core Services    */
import { DatabaseGuard } from './shared/database-guard.service';
import { DatabaseService } from './shared/database.service';
import { Navigator } from './shared/navigator.service';
import { InterfaceMetaService } from './shared/meta.service';
import { appReducers, appEffects } from './app.store';

/*    App Services    */
import { UserService } from './user/user.service';
import { InventoryService } from './inventory/inventory.service';

/*    App Components    */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact.component';
import { PricingComponent } from './home/pricing.component';
import { AboutPageComponent } from './home/about-page.component';

@NgModule( {
	declarations: [
		AppComponent,
		HomeComponent,
		ContactComponent,
		PricingComponent,
		AboutPageComponent
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
		StoreModule.forRoot( appReducers ),
		EffectsModule.forRoot( appEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( { maxAge: 25 } ),
		JamModelLibraryModule,
		JamFirestoreModule.forRoot( database.jamFireStoreConfig ),
		JamAuthModule.forRoot(),
		JamNavigatorModule,
		JamEventManagerModule.forRoot(),
		JamExplorerModule,
		JamXboxMenuModule,
		JamAccordionItemModule,
		JamListModule,
		JamTreeModule,
		JamTreeListModule,
		AppRoutingModule,
		AccountModule
	],
	providers: [
		AngularFireDatabase,
		DatabaseGuard,
		DatabaseService,
		Navigator,
		InterfaceMetaService,
		InventoryService,
		UserService
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
