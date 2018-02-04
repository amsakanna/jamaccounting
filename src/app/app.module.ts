/*    Framework Modules    */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';

/*    3rd Party Modules    */
import { AngularFireModule } from 'angularfire2';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/*    My Library Modules    */
import { JamNavigatorModule } from '../jam/navigator';
import { JamFirestoreModule } from "../jam/firestore";
import { JamAuthModule } from "../jam/auth";

/*    App Modules    */
import { database, environment } from "../environments/environment";
import { appRoutes } from './app.routes';
import { appReducers, appEffects } from './app.store';
import { DatabaseService } from './shared/database.service';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { JamNotificationModule } from '../jam/notification';

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule, MatIconModule,
		RouterModule.forRoot( appRoutes ),
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
		StoreModule.forRoot( appReducers ),
		EffectsModule.forRoot( appEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( { maxAge: 25 } ),
		JamNavigatorModule,
		JamFirestoreModule.forRoot( database.config, database.firebaseAppConfig ),
		JamAuthModule.forRoot(),
		JamNotificationModule,
		HomeModule
	],
	providers: [ DatabaseService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
