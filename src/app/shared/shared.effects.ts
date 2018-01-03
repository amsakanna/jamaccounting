import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from "angularfire2/firestore";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { SharedModuleState } from "./shared.state";
import { SharedAction, SharedActionTypes } from "./shared.actions";

@Injectable()
export class SharedEffects
{
	@Effect() public initialize$: Observable<Action>;

	constructor ( private actions$: Actions,
		private store: Store<SharedModuleState>,
		private firestore: AngularFirestore )
	{

		console.log( 'shared-effects' );

		this.initialize$ = this.actions$.ofType<SharedAction.Initialize>( SharedActionTypes.initialize )
			.map( action => action ? new SharedAction.Initialized() : new SharedAction.InitializeFailed() );

	}
}