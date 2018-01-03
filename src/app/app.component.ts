import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { NavigatorAction } from '../jam/navigator';
import { DbAction } from '../jam/firestore';
import { AuthAction } from '../jam/auth';
import { Pages } from './model';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )
export class AppComponent
{
	private authenticated: boolean;
	private pages = Pages;

	constructor ( private store: Store<AppState> )
	{
		this.store.dispatch( new NavigatorAction.Initialize( this.pages ) );
		this.store.dispatch( new DbAction.Initialize() );
		this.store.dispatch( new AuthAction.Initialize() );

		this.store.select( state => state.authState.authenticated )
			.subscribe( authenticated => this.authenticated = authenticated );
	}

	ngOnInit () { }

	private goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

}

