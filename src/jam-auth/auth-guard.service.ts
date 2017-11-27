import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from "./jam-auth.actions";

@Injectable()
export class AuthGuard implements CanActivate
{

	constructor ( private store: Store<AuthModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{

		/**
		 * Get authentication
		 * If not authenticated, route to sign-in page
		 */
		return this.store.select( state => state.authState.authenticated )
			.take( 1 )
			.do( authenticated =>
			{
				console.log( 'auth guard let me in ?', authenticated );
				if ( !authenticated ) {
					this.store.dispatch( new AuthAction.RequestSignInPage() );
				}
			} );
	}

}