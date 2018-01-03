/*    Framework Modules    */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import
{
	MatIconModule,
	MatButtonModule,
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
import { JamNavigatorModule } from '../jam/navigator';
import { JamFirestoreModule } from "../jam/firestore";
import { JamAuthModule } from "../jam/auth";
import
{
	JamAccordionItemModule,
	JamListModule,
	JamTreeModule,
	JamTreeListModule,
	JamXboxMenuModule,
	JamExplorerModule
} from '../jam/ui-library';

/*    Environment variables    */
import { database, environment } from "../environments/environment";

/*    App Modules    */
import { appRoutes } from './app.routes';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

/*    Shared Modules    */
import { appReducers, appEffects } from './app.store';
import { DatabaseService } from './shared/database.service';
import { InterfaceMetaService } from './shared/meta.service';
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
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		ReactiveFormsModule,
		FormsModule,
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		StoreModule.forRoot( appReducers ),
		EffectsModule.forRoot( appEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( { maxAge: 25 } ),
		JamFirestoreModule.forRoot( database.jamFireStoreConfig ),
		JamAuthModule.forRoot(),
		JamNavigatorModule,
		JamExplorerModule,
		JamXboxMenuModule,
		JamAccordionItemModule,
		JamListModule,
		JamTreeModule,
		JamTreeListModule,
		RouterModule.forRoot( appRoutes )
	],
	providers: [
		AngularFireDatabase,
		DatabaseService,
		InterfaceMetaService
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
