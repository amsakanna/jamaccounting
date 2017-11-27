import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { configToken } from './jam-firestore.config';
import { IJamFirestoreConfig } from './models/i-jam-firestore-config.model';
import { JamFirestoreDatabase } from "./services/jam-firestore-database.service";

@NgModule( {
    imports: [
        CommonModule
    ],
    providers: [
        JamFirestoreDatabase
    ]
} )
export class JamFirestoreModule
{
    static forRoot ( config: IJamFirestoreConfig ): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreModule,
            providers: [
                JamFirestoreDatabase,
                { provide: configToken, useValue: config }
            ]
        };
    }
}