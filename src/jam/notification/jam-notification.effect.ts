import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from '@ngrx/effects';
import { NotificationModuleState } from './jam-notification.state';
import { NotificationAction, NotificationActionTypes } from './jam-notification.action';
import { NotificationMessage } from "./notification-message.model";

@Injectable()
export class NotificationEffect
{
	@Effect() public open$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<NotificationModuleState>,
		private matSnackBar: MatSnackBar
	)
	{

		this.open$ = this.actions$.ofType<NotificationAction.Open>( NotificationActionTypes.open )
			.withLatestFrom( this.store.select( state => state.notificationState.defaultMessage ) )
			.map( ( [ action, defaultMessage ] ) => ( {
				content: action.message.content || defaultMessage.content,
				action: action.message.action || defaultMessage.action,
				duration: action.message.duration || defaultMessage.duration
			} ) )
			.map( ( message: NotificationMessage ) => this.matSnackBar.open( message.content, message.action, { duration: message.duration } ) )
			.switchMap( snackBar => snackBar.afterDismissed() )
			.map( closed => new NotificationAction.Closed() );
	}

}
