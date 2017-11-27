import { Pages } from './../shared/pages.enum';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { DatabaseService } from "../shared/database.service";
import { AuthAction, AuthActionTypes } from "../../jam-auth/jam-auth";
import { NavigatorAction } from "../../jam-navigator/jam-navigator";

@Injectable()
export class CoreEffects
{
	@Effect() public signedIn$: Observable<Action>;
	@Effect() public signedOut$: Observable<Action>;

	constructor ( private actions$: Actions, private db: DatabaseService )
	{

		this.signedIn$ = this.actions$.ofType( AuthActionTypes.signedIn )
			.map( action => new NavigatorAction.Navigate( Pages.User ) );

		this.signedOut$ = this.actions$.ofType( AuthActionTypes.signedOut )
			.map( action => new NavigatorAction.Navigate( Pages.Home ) );

	}
}