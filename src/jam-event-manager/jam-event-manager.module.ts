import { NgModule, ModuleWithProviders } from '@angular/core';

import { EventManager } from './services/event-manager.service';

@NgModule( {} )
export class JamEventManagerModule
{
    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: JamEventManagerModule,
            providers: [ EventManager ]
        }
    }
}