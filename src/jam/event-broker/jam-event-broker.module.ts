import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { EventPair } from './event-pair.model';

export const configToken = new InjectionToken<EventPair[]>( 'eventPairs' );

@NgModule( {} )
export class JamEventBrokerModule
{
	static forRoot ( eventPairs: EventPair[] ): ModuleWithProviders
	{
		return {
			ngModule: JamEventBrokerModule,
			providers: [
				{ provide: configToken, useValue: eventPairs }
			]
		};
	}
}
