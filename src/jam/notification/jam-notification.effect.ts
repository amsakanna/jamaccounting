import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from '@ngrx/effects';
import { NotificationModuleState } from './jam-notification.state';
import { NotificationActionTypes, NotificationAction } from './jam-notification.action';
import { NotificationService } from "./jam-notification.service";

@Injectable()
export class NotificationEffect
{
	@Effect() public show$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<NotificationModuleState>,
		private matSnackBar: MatSnackBar
	)
	{

		var myTriggers: string[];
		myTriggers = [ '[Product] removed', '[TaxType] removed' ];

		this.store.select( state => state.notificationState.triggers )
			.subscribe( triggers =>
			{
				console.log( 'myTriggers', myTriggers );
				console.log( 'triggers', triggers );
				this.show$ = this.actions$.ofType( ...myTriggers )
					.map( action => this.matSnackBar.open( 'Item Added hello', 'Ok', { duration: 5000 } ) )
					.switchMap( snackBar => snackBar.afterDismissed() )
					.map( closed => new NotificationAction.Closed() );
				myTriggers = [ '[Product] added', '[Product] removed', '[TaxType] removed' ];
				console.log( 'myTriggers', myTriggers );
			} )


	}

}
