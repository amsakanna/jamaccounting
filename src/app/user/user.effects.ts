import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { UserModuleState, UserState } from './user.state';
import { DatabaseService } from "../shared/database.service";
import { UserActionTypes, UserAction } from './user.actions';
import { NavigatorAction } from "../../jam-navigator/jam-navigator";
import { Pages } from "../shared/pages.enum";
import { AuthActionTypes, AuthAction } from "../../jam-auth/jam-auth";
import { UserAccount } from "./user-account.model";

@Injectable()
export class UserEffects
{
	@Effect() public authenticated$: Observable<Action>;
	@Effect() public deauthenticated$: Observable<Action>;
	@Effect() public requestRegisterPage$: Observable<Action>;
	@Effect() public requestSignInPage$: Observable<Action>;

	constructor ( private actions$: Actions, private store: Store<UserModuleState>, private db: DatabaseService )
	{

		this.authenticated$ = this.actions$.ofType<AuthAction.Authenticated>( AuthActionTypes.authenticated )
			.switchMap( action => this.db.tables.User.forceLookup( action.user, action.user.email, 'email' ) )
			.switchMap( user => this.db.tables.UserAccount.forceLookup( new UserAccount( { key: user.key, user: user } ) ) )
			.map( userAccount =>
			{
				console.log( 'user-loaded' );
				return new UserAction.Loaded( userAccount );
			} );

		this.deauthenticated$ = this.actions$.ofType<AuthAction.Deauthenticated>( AuthActionTypes.deauthenticated )
			.map( action => new UserAction.Unload() );

		this.requestRegisterPage$ = this.actions$.ofType<AuthAction.RequestRegisterPage>( AuthActionTypes.requestRegisterPage )
			.map( action => new NavigatorAction.Navigate( Pages.Register ) );

		this.requestSignInPage$ = this.actions$.ofType<AuthAction.RequestSignInPage>( AuthActionTypes.requestSignInPage )
			.map( action => new NavigatorAction.Navigate( Pages.SignIn ) );

	}
}