import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IJamXboxMenuItem } from '../jam-xbox-menu/jam-xbox-menu.component';
import { EventManager, Event, NavigationEvent, Events } from '../../jam-event-manager/jam-event-manager';
import { MyEvents } from '../models/event.model';

@Injectable()
export class Navigator
{

	private map: Array<string>;
	public previousUrl: string;
	public currentUrl: string;
	private menu: Array<IJamXboxMenuItem>;

	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private eventManager: EventManager)
	{
		
		this.previousUrl = '/';
		this.currentUrl = '/';
		this.menu = new Array<IJamXboxMenuItem>();

		this.router.events
		.filter( event => event instanceof NavigationEnd )
		.subscribe( ( event: any ) => {
			this.previousUrl = this.currentUrl;
			this.currentUrl = event.urlAfterRedirects;
			this.buildMenu();
		});

		this.buildMap();

		this.eventManager.navigationEvents
		.subscribe( event => {
			this.handle( event as NavigationEvent );
		});

	}

	private handle( event: NavigationEvent )
	{
		var url = this.map[event.name];
		url = ( url == '$previousUrl' ) ? this.previousUrl : url;
		this.router.navigateByUrl( url );
	}

	private buildMenu()
	{
		switch ( true ) {
			case this.currentUrl.startsWith('/user'):
				this.menu = new Array<IJamXboxMenuItem>();
				this.menu = [
					{ $key: MyEvents.ProfileRequested, text: 'Profile' },
					{ $key: MyEvents.CompaniesRequested, text: 'Comapanies' },
					{ $key: MyEvents.MyPlanRequested, text: 'My Plan' },
					{ $key: Events.SignOutRequested, text: 'Sign Out' }
				];
				break;
			default:
				this.menu = new Array<IJamXboxMenuItem>();
				break;
		}
	}

	private buildMap()
	{
		this.map = new Array<string>();
		
		this.map[MyEvents.HomeRequested] = '/';
		this.map[MyEvents.PricingRequested] = '/pricing';
		this.map[MyEvents.RegisterPageRequested] = '/register';
		this.map[MyEvents.SignInPageRequested] = '/sign-in';
		this.map[Events.SignedIn] = '/user/companies';
		this.map[Events.Registered] = '/user/companies';
		this.map[Events.SignedOut] = '/';
		
		this.map[MyEvents.UserRequested] = '/user/companies';
		this.map[MyEvents.CompaniesRequested] = '/user/companies';
		this.map[MyEvents.ProfileRequested] = '/user';
		this.map[MyEvents.MyPlanRequested] = '/user/my-plan';
		this.map[MyEvents.SettingsRequested] = '/user/settings';
		
		this.map[MyEvents.AccountsRequested] = '/accounts';
		this.map[MyEvents.InventoryRequested] = '/inventory';
		this.map[MyEvents.VouchersRequested] = '/vouchers';
	}

}
