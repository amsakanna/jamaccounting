import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { AuthService } from '../../jam-auth/jam-auth';
import { InterfaceMetaService } from './meta.service';
import { Pages } from '../enums/pages.enum';
import { DatabaseService } from "./database.service";
import { UserService } from './user.service';
import { AccountService } from './account.service';

@Injectable()
export class AuthGuard implements CanActivate
{

	constructor(private router: Router,
				private eventManager: EventManager,
				private authService: AuthService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{

		// Get authentication
		// If not authenticated, route to sign-in page
		return this.authService.auth
		.map( auth => auth.authenticated )
		.take( 1 )
		.do( authenticated => {
			console.log( 'auth guard let me in ?', authenticated );
			if( ! authenticated ) {
				this.eventManager.emitPageRequestEvent( Pages.SignIn, EventStatus.Requested );
			}
		});
	}

}

@Injectable()
export class DatabaseGuard implements CanActivate
{

	constructor(private databaseService: DatabaseService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Check if database is loaded
		return this.databaseService.loadStatus.asObservable().take( 1 )
		.do( loaded => {
			console.log( 'database loaded ?', loaded );
		});

	}

}

@Injectable()
export class UserGuard implements CanActivate
{

	constructor(private userService: UserService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Check if user is loaded
		return this.userService.loadStatus.take( 1 )
		.do( loaded => {
			console.log( 'user loaded ?', loaded );
		});
	}

}
