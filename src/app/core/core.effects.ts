import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
// import { CoreModuleState } from "./core.state";
import { AuthAction, AuthActionTypes } from "../../jam/auth";
import { NavigatorAction } from "../../jam/navigator";
import { NotificationAction } from "../../jam/notification";
import { MatDialog } from "@angular/material";
import { Pages } from '../model';

@Injectable()
export class CoreEffects
{
	@Effect() public signedIn$: Observable<Action>;
	@Effect() public signedOut$: Observable<Action>;
	// @Effect( { dispatch: false } ) public create$: Observable<any>;
	@Effect() public added$: Observable<Action>;
	@Effect() public modified$: Observable<Action>;
	@Effect() public removed$: Observable<Action>;

	constructor (
		private actions$: Actions,
		// private store: Store<CoreModuleState>,
		// private matDialog: MatDialog
	)
	{

		this.signedIn$ = this.actions$.ofType( AuthActionTypes.signedIn )
			.map( action => new NavigatorAction.Navigate( Pages.User ) );

		this.signedOut$ = this.actions$.ofType( AuthActionTypes.signedOut )
			.map( action => new NavigatorAction.Navigate( Pages.Home ) );

		// this.create$ = this.actions$.filter( action => !!action.type.match( /\[.*\] create/ ) )
		// 	.withLatestFrom( this.store.select( state => state.coreState.dialogs ) )
		// 	.map( ( [ action, dialogs ] ) =>
		// 	{
		// 		console.log( dialogs );
		// 		const myDialog = dialogs.find( dialog => dialog.id === action.type );
		// 		if ( !myDialog ) return null;
		// 		this.matDialog.open( myDialog.component, { id: myDialog.id, width: '650px' } );
		// 	} );

		this.added$ = this.actions$.filter( action => !!action.type.match( /\[.*\] added/ ) )
			.map( action => new NotificationAction.Open( { content: 'Item Added', duration: 5000 } ) );

		this.modified$ = this.actions$.filter( action => !!action.type.match( /\[.*\] modified/ ) )
			.map( action => new NotificationAction.Open( { content: 'Item Saved', duration: 5000 } ) );

		this.removed$ = this.actions$.filter( action => !!action.type.match( /\[.*\] removed/ ) )
			.map( action => new NotificationAction.Open( { content: 'Item Removed', duration: 5000 } ) );

	}
}
