import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, mergeMap } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from '@ngrx/effects';
import { EventBrokerModuleState } from './jam-event-broker.state';
import { EventBrokerAction, EventBrokerActionTypes } from './jam-event-broker.action';
import { EventPair } from "./event-pair.model";
import { NotificationAction } from "../notification";
import { configToken } from "./jam-event-broker.module";
import { isRegExp } from "util";

@Injectable()
export class EventBrokerEffect
{
	@Effect() private if$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<EventBrokerModuleState>,
		@Inject( configToken ) eventPairs: EventPair[]
	)
	{
		const eventPairIfs = eventPairs.map( item => item.if );

		console.log( !!'[Product] Create'.match( '[Product] Create' ) )

		this.if$ = this.actions$.filter( action => !!eventPairIfs.find( eventPairIf => isRegExp( eventPairIf ) ? !!action.type.match( eventPairIf ) : action.type === eventPairIf ) )
			.map( action => eventPairs.find( eventPair => isRegExp( eventPair.if ) ? !!action.type.match( eventPair.if ) : action.type === eventPair.if ) )
			.mergeMap( eventPair => eventPair.then );
	}

}
