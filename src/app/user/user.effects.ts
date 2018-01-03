import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { UserModuleState, UserState } from './user.state';
import { DatabaseService } from "../shared/database.service";
import { UserActionTypes, UserAction } from './user.actions';
import { NavigatorAction } from "../../jam/navigator";
import { UserAccount, Pages } from "../model";
import { AuthActionTypes, AuthAction } from "../../jam/auth";
import { DatabaseActionTypes, DbAction } from "../../jam/firestore";
import { defer } from "rxjs/observable/defer";
import { of } from "rxjs/observable/of";

@Injectable()
export class UserEffects
{
	@Effect() public loaded$: Observable<Action>;
	@Effect() public authenticated$: Observable<Action>;
	@Effect() public requestRegisterPage$: Observable<Action>;
	@Effect() public requestSignInPage$: Observable<Action>;

	constructor ( private actions$: Actions, private store: Store<UserModuleState>, private db: DatabaseService )
	{

		console.log( 'user-effects' );

		this.loaded$ = this.actions$.ofType<UserAction.Load>( UserActionTypes.load )
			.withLatestFrom( this.store.select( state => state.authState.user ) )
			.map( ( [ action, user ] ) => user )
			.filter( user => !!user )
			.switchMap( user => this.db.tables.User.forceLookup( user, user.email, 'email' ) )
			.switchMap( user => this.db.tables.UserAccount.forceLookup( new UserAccount( { key: user.key, user: user } ) ) )
			.map( userAccount => new UserAction.Loaded( userAccount ) );

		this.authenticated$ = this.store.select( state => state.authState.user )
			.map( user => user ? new UserAction.Load() : new UserAction.Unload() );

		this.requestRegisterPage$ = this.actions$.ofType<AuthAction.RequestRegisterPage>( AuthActionTypes.requestRegisterPage )
			.map( action => new NavigatorAction.Navigate( Pages.Register ) );

		this.requestSignInPage$ = this.actions$.ofType<AuthAction.RequestSignInPage>( AuthActionTypes.requestSignInPage )
			.map( action => new NavigatorAction.Navigate( Pages.SignIn ) );

	}
}