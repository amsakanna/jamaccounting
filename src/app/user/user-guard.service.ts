import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { UserModuleState } from './user.state';
import { UserAction, UserActionTypes } from './user.actions';

@Injectable()
export class UserGuard implements CanActivate
{

	constructor ( private store: Store<UserModuleState>, private actions: Actions ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		console.log( 'user-guard-init' );
		// Check if user is loaded
		// return this.store.select( state => state.userState.loaded )
		return this.actions.ofType<UserAction.Loaded>( UserActionTypes.loaded )
			.map( action => !!action.item )
			.take( 1 )
			.do( loaded => console.log( 'user loaded ?', loaded ) );
	}

}
