import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { configToken } from './database.config';
import { DatabaseConfig } from './database-config.model';
import { DatabaseGuard } from './database.guard';
import { DatabaseService } from "./database.service";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

@NgModule( {
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    providers: [ DatabaseGuard, DatabaseService ]
} )
export class JamFirestoreModule
{
    static forRoot ( config: DatabaseConfig, firebaseAppConfig: FirebaseAppConfig ): ModuleWithProviders
    {
        return {

            ngModule: JamFirestoreModule,
            providers: [
                DatabaseGuard,
                DatabaseService,
                { provide: configToken, useValue: config }
            ]
        };
    }
}