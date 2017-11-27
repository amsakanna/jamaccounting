import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { NavigatorAction } from '../jam-navigator/jam-navigator';
import { AuthAction } from '../jam-auth/jam-auth';
import { Pages } from './shared/pages.enum';

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
		this.store.dispatch( new AuthAction.Initialize() );
		this.store.select( state => state.authState.authenticated )
			.subscribe( authenticated => this.authenticated = authenticated );
	}

	ngOnInit () { }

	private goto ( page: Pages )
	{
		console.log( page, this.pages );
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

}

