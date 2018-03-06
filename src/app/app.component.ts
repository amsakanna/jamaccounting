import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModuleState } from './app.store';
import { NavigatorAction } from '../jam/navigator';
import { DbAction } from '../jam/firestore';
import { AuthAction } from '../jam/auth';
import { NotificationAction } from '../jam/notification';
import { Pages } from './model';
import { MenuItem } from './ui';

@Component( {
	selector: 'app-root',
	template: `
		<div class="container">
			<div class="component stretch">
				<main>
					<router-outlet>
					</router-outlet>
				</main>
				<header>
					<jam-toolbar
						[menu]="menu"
						(selectedChange)="menuSelectionChange( $event )">
					</jam-toolbar>
				</header>
			</div>
		</div>
	`,
	styles: [ `
		.component > main {
			width: 100%;
			height: calc( 100% - 172px );
			padding-top: 50px;
			padding-bottom: 50px;
		}
		.component > header {
			width: 100%;
			height: 72px;
		}
	`]
} )
export class AppComponent
{

	private menu: MenuItem[];

	constructor ( private store: Store<AppModuleState> )
	{
		/**
		 * Initialize Eager Modules
		 */
		this.store.dispatch( new NavigatorAction.Initialize( Pages ) );
		this.store.dispatch( new DbAction.Initialize() );
		this.store.dispatch( new AuthAction.Initialize() );
		this.store.dispatch( new NotificationAction.Initialize( { content: 'Done', action: 'Ok', duration: 5000, attended: false } ) );

		/**
		 * Prepare Menu
		 */
		this.menu = [
			{ text: null, icon: 'donut_small', link: Pages.Home, tooltip: { text: 'Dashboard', position: 'above' } },
			{
				text: null, icon: 'add_circle', tooltip: { text: 'Quick Add', position: 'above' }, subMenu: [
					{ text: 'Product', icon: null, link: Pages.Product },
					{ text: 'Category', icon: null, link: Pages.ProductCategory },
					{ text: 'Brand', icon: null, link: Pages.Brand },
					{ text: 'Tax', icon: null, link: Pages.Tax },
					{ text: 'TaxGroup', icon: null, link: Pages.TaxGroup },
					{ text: 'Inventory', icon: null, link: Pages.Inventory },
					{ text: 'Party', icon: null, link: Pages.Party }
				]
			},
			{ text: null, icon: 'account_balance', link: Pages.CreateInvoice, tooltip: { text: 'Invoice', position: 'above' } }
		]
	}

	private menuSelectionChange ( menu: MenuItem )
	{
		this.store.dispatch( new NavigatorAction.Navigate( menu.link ) );
	}
}
