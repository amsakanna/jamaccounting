import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JamFirestoreDatabase, IJamFireStoreConfig, configToken } from './jam-firestore';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [JamFirestoreDatabase],
    exports: []
})
export class JamFirestoreModule
{
    static forRoot( config: IJamFireStoreConfig ): ModuleWithProviders
    {
        var c = new InjectionToken<IJamFireStoreConfig>('config')
        console.log( config, configToken, c );
        return {
            ngModule: JamFirestoreModule,
            providers: [
                JamFirestoreDatabase,
                { provide: configToken, useValue: config }
            ]
        }
    }
}