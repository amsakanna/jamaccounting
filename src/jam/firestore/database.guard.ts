import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { DatabaseModuleState } from './database.state';

@Injectable()
export class DatabaseGuard implements CanActivate, CanLoad
{

	constructor ( private store: Store<DatabaseModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		console.log( 'database-guard-can-activate' );
		// Check if database is loaded
		return this.store.select( state => state.databaseState.initialized )
			.filter( initialized => initialized ).take( 1 )
			.do( initialized => console.log( 'database initialized ?', initialized ) );

	}

	canLoad ( route: Route ): Observable<boolean>
	{
		console.log( 'database-guard-can-load' );
		// Check if database is loaded
		return this.store.select( state => state.databaseState.initialized )
			.filter( initialized => initialized ).take( 1 );
	}

}
