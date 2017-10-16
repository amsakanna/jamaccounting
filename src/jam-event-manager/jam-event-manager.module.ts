import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManager } from './services/event-manager.service';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [EventManager],
    exports: []
})
export class JamEventManagerModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: JamEventManagerModule,
            providers: [
                EventManager
            ]
        }
    }
}