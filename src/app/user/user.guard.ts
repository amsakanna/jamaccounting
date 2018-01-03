import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UserModuleState } from './user.state';

@Injectable()
export class UserGuard implements CanActivate
{

	constructor ( private store: Store<UserModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		console.log( 'user-guard' );
		// Check if user is loaded
		return this.store
			.select( state => state.userState.loaded )
			.filter( loaded => loaded )
			.take( 1 )
			.do( loaded => console.log( 'user loaded ?', loaded ) );
	}

}
