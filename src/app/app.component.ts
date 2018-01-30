import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModuleState } from './app.store';
import { NavigatorAction } from '../jam/navigator';
import { DbAction } from '../jam/firestore';
import { AuthAction } from '../jam/auth';
import { Pages } from './model';
import { NotificationAction } from '../jam/notification';

@Component( {
	selector: 'app-root',
	template: `
		<div class="container">
			<header>
				<section class="company">
					<a mat-button (click)="goto( pages.Home )">
						<mat-icon color="primary" class="home-icon"> home </mat-icon>
					</a>
				</section>
				<section class="user">
					<a mat-button (click)="goto( pages.User )">
						<mat-icon color="primary" *ngIf="authenticated" class="user-icon"> account_circle </mat-icon>
						<span *ngIf="!authenticated" class="user-text"> SIGN IN </span>
					</a>
				</section>
			</header>

			<main>
				<router-outlet>
				</router-outlet>
			</main>
		</div>
	`,
	styles: [ `
		.container {
			flex-direction: column;
		}

		.container > header {
			padding: 0px 50px;
			height: 70px;
			width: calc(100% - 100px);
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.container > main {
			width: 100%;
			height: calc( 100% - 70px);
		}

		.home-icon, .user-icon {
			width: 30px;
			height: 30px;
			font-size: 30px;
		}
	`]
} )
export class AppComponent
{
	private authenticated: boolean;
	private pages = Pages;

	constructor ( private store: Store<AppModuleState> )
	{
		this.store.dispatch( new NavigatorAction.Initialize( this.pages ) );
		this.store.dispatch( new DbAction.Initialize() );
		this.store.dispatch( new AuthAction.Initialize() );
		this.store.dispatch( new NotificationAction.Initialize() );

		this.store.select( state => state.authState.authenticated )
			.subscribe( authenticated => this.authenticated = authenticated );
	}

	ngOnInit () { }

	private goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

}
