import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { DatabaseService } from "./database.service";

@Injectable()
export class DatabaseGuard implements CanActivate
{

	constructor ( private databaseService: DatabaseService ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		// Check if database is loaded
		return this.databaseService.loadStatus.asObservable().take( 1 )
			.do( loaded =>
			{
				console.log( 'database loaded ?', loaded );
			} );

	}

}
