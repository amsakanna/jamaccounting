import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthModuleState } from './jam-auth.state';
import { AuthActionTypes, AuthAction } from "./jam-auth.actions";
import { User } from "./user.model";

@Injectable()
export class AuthEffects
{
	@Effect() initialize$: Observable<Action>;
	@Effect() register$: Observable<Action>;
	@Effect() signIn$: Observable<Action>;
	@Effect() signOut$: Observable<Action>;
	@Effect() deleteUser$: Observable<Action>;

	constructor ( private actions$: Actions, private store: Store<AuthModuleState>, private angularFireAuth: AngularFireAuth )
	{

		console.log( 'auth-effects' );

		this.initialize$ = this.actions$.ofType<AuthAction.Initialize>( AuthActionTypes.initialize )
			.switchMap( action => this.angularFireAuth.authState )
			.mergeMap( firebaseUser =>
			{

				const authenticated = !!firebaseUser;
				// return authenticated ? new AuthAction.Authenticated( new User( firebaseUser ) ) : new AuthAction.Deauthenticated();
				return authenticated
					? Observable.from( [ new AuthAction.Initialized(), new AuthAction.Authenticated( new User( firebaseUser ) ) ] )
					: Observable.from( [ new AuthAction.Initialized(), new AuthAction.Deauthenticated() ] );
			} );

		this.register$ = this.actions$.ofType<AuthAction.Register>( AuthActionTypes.register )
			.switchMap( action => this.angularFireAuth.auth.createUserWithEmailAndPassword( action.credential.email, action.credential.password ) )
			.map( error => !error.code ? new AuthAction.Registered() : new AuthAction.RegisterFailed( error.code, error.message ) );

		this.signIn$ = this.actions$.ofType<AuthAction.SignIn>( AuthActionTypes.signIn )
			.switchMap( action => this.angularFireAuth.auth.signInWithEmailAndPassword( action.credential.email, action.credential.password ) )
			.map( error => !error.code ? new AuthAction.SignedIn() : new AuthAction.SignInFailed( error.code, error.message ) );

		this.signOut$ = this.actions$.ofType<AuthAction.SignOut>( AuthActionTypes.signOut )
			.switchMap( action => this.angularFireAuth.auth.signOut() )
			.map( error => !error.code ? new AuthAction.SignedOut() : new AuthAction.SignOutFailed( error.code, error.message ) );

		this.deleteUser$ = this.actions$.ofType<AuthAction.DeleteUser>( AuthActionTypes.deleteUser )
			.switchMap( action => this.angularFireAuth.auth.currentUser.delete() )
			.map( error => !error.code ? new AuthAction.DeletedUser() : new AuthAction.DeleteUserFailed( error.code, error.message ) );

	}
}