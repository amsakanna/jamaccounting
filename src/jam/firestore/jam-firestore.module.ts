import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { configToken } from './jam-firestore.config';
import { JamFirestoreConfig } from './jam-firestore-config.model';
import { DatabaseGuard } from './database.guard';
import { JamFirestore } from "./database.service";

@NgModule( {
    imports: [ CommonModule ],
    providers: [ DatabaseGuard, JamFirestore ]
} )
export class JamFirestoreModule
{
    static forRoot ( config: JamFirestoreConfig ): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreModule,
            providers: [
                DatabaseGuard,
                JamFirestore,
                { provide: configToken, useValue: config }
            ]
        };
    }
}