import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { IJamXboxMenuItem } from '../../jam-ui-library/jam-ui-library';
import { EventManager, Event, NavigationEvent, Events, EventStatus, DatabaseEvent, EventTypes } from '../../jam-event-manager/jam-event-manager';
import { Pages } from '../shared/pages.enum';
import { DatabaseOperations } from '../../jam-firestore/jam-firestore';
import { KeyValue } from '../../jam-model-library/jam-model-library';
import { Subject } from 'rxjs/Subject';
import { DatabaseService } from './database.service';

@Injectable()
export class Navigator
{

	private map: Array<string>;
	public previousUrl: string;
	public currentUrl: string;
	public urlParams: Array<KeyValue>;
	public currentPage: Pages;
	private menu: Array<IJamXboxMenuItem>;
	public loadStatus: Subject<boolean>;

	constructor ( private router: Router,
		private activatedRoute: ActivatedRoute,
		private eventManager: EventManager,
		private db: DatabaseService )
	{

		console.log( 'navigation-service' );
		this.loadStatus = new Subject<boolean>();

		this.previousUrl = '/';
		this.currentUrl = '/';
		this.urlParams = new Array<KeyValue>();
		this.menu = new Array<IJamXboxMenuItem>();

		this.router.events
			.filter( event => event instanceof NavigationEnd )
			.subscribe( ( event: any ) =>
			{
				console.log( 'router event received' );
				this.previousUrl = this.currentUrl;
				this.currentUrl = event.urlAfterRedirects;
				this.urlParams = this.getParams();
				this.enterCollections();
				this.buildMenu();
			} );

		this.buildMap();

		this.eventManager.navigationEvents
			// .filter( event => event.type == EventTypes.PageRequestEvent )
			.subscribe( event =>
			{
				console.log( event );
				this.handle( event );
			} );

		this.loadStatus.next( true );

	}

	private getParams (): Array<KeyValue>
	{
		const rootRoute = this.router.routerState.root.firstChild;
		if ( !rootRoute ) return [];
		const params = this.flattenTree( [ rootRoute ], 'params', 'children' )
			.map( item =>
			{
				var param = item.value;
				var items = Object.keys( param ).map( key =>
				{
					return new KeyValue( key, param[ key ] );
				} );
				return items;
			} );
		return [].concat( ...params );
	}

	private enterCollections ()
	{
		this.urlParams && this.urlParams.forEach( urlParam =>
		{
			if ( [ 'user', 'company', 'account' ].indexOf( urlParam.key ) >= 0 ) {
				// this.db.EnterCollection( this.initCap( urlParam.key, '-' ), urlParam.value );
			}
		} )
	}

	private initCap ( text: string, separator: string ): string
	{
		return text.split( separator ).reduce( ( sum, item ) =>
		{
			return sum + item.charAt( 0 ).toUpperCase() + item.slice( 1 );
		}, '' );
	}

	private flattenTree ( tree, dataProperty, childrenProperty )
	{
		var p = [];
		if ( tree.length > 0 ) {
			tree.forEach( item =>
			{
				p = [ ...p, item[ dataProperty ], ...this.flattenTree( item[ childrenProperty ], dataProperty, childrenProperty ) ];
			} );
		}
		return p;
	}

	private handle ( event: Event )
	{
		var routeId: string;
		var urlParams: Array<KeyValue>;
		var url: string

		if ( event.name in DatabaseOperations ) {
			const dbEvent = event as DatabaseEvent;
			routeId = dbEvent.name + Event.IFS + dbEvent.status + Event.IFS + dbEvent.tableName;
		} else {
			const navEvent = event as NavigationEvent;
			routeId = navEvent.name + Event.IFS + navEvent.status;
			urlParams = navEvent.urlParams;
			this.currentPage = navEvent.name as Pages;
		}

		url = this.map[ routeId ];
		url = ( url == '$previousUrl' ) ? this.previousUrl : url;

		urlParams && urlParams.forEach( urlParam =>
		{
			const i = this.urlParams.findIndex( p => p.key == urlParam.key );
			if ( i >= 0 ) {
				this.urlParams[ i ].value = urlParam.value;
			} else {
				this.urlParams.push( urlParam );
			}
			// url = url.replace( '{' + urlParam.key + '}', urlParam.value );
		} );

		console.log( 'new urlParams', urlParams );
		console.log( 'all urlParams', this.urlParams );

		this.urlParams.forEach( urlParam =>
		{
			url = url.replace( '{' + urlParam.key + '}', urlParam.value )
		} );

		url = url.startsWith( '/' ) ? url : this.currentUrl + '/' + url;

		console.log( routeId, url );
		this.router.navigate( [ url ] );
	}

	private buildMenu ()
	{
		switch ( true ) {
			case this.currentUrl.startsWith( '/user' ):
				this.menu = new Array<IJamXboxMenuItem>();
				this.menu = [
					{ key: Pages.Profile, text: 'Profile' },
					{ key: Pages.Companies, text: 'Companies' },
					{ key: Pages.MyPlan, text: 'My Plan' },
					{ key: Events.SignOut, text: 'Sign Out' }
				];
				break;
			default:
				this.menu = new Array<IJamXboxMenuItem>();
				break;
		}
	}

	private buildMap ()
	{
		this.map = new Array<string>();

		this.map[ Pages.Home + Event.IFS + EventStatus.Requested ] = '/';
		this.map[ Pages.Pricing + Event.IFS + EventStatus.Requested ] = '/pricing';
		this.map[ Pages.Register + Event.IFS + EventStatus.Requested ] = '/register';
		this.map[ Pages.SignIn + Event.IFS + EventStatus.Requested ] = '/sign-in';
		this.map[ Events.SignIn + Event.IFS + EventStatus.Succeeded ] = '/user/companies';
		this.map[ Events.Register + Event.IFS + EventStatus.Succeeded ] = '/user/companies';
		this.map[ Events.SignOut + Event.IFS + EventStatus.Succeeded ] = '/';

		this.map[ Pages.Profile + Event.IFS + EventStatus.Requested ] = '/user';
		this.map[ Pages.MyPlan + Event.IFS + EventStatus.Requested ] = '/user/my-plan';
		this.map[ Pages.Settings + Event.IFS + EventStatus.Requested ] = '/user/settings';
		this.map[ Pages.User + Event.IFS + EventStatus.Requested ] = '/user/companies';
		this.map[ Pages.Companies + Event.IFS + EventStatus.Requested ] = '/user/companies';
		this.map[ Pages.CreateCompany + Event.IFS + EventStatus.Requested ] = '/user/companies/@new';

		this.map[ Pages.Company + Event.IFS + EventStatus.Requested ] = '/company/{company}';
		this.map[ Pages.Accounts + Event.IFS + EventStatus.Requested ] = '/company/{company}/accounts';
		this.map[ Pages.Account + Event.IFS + EventStatus.Requested ] = '/company/{company}/accounts/{account}';
		this.map[ Pages.CreateAccount + Event.IFS + EventStatus.Requested ] = '/company/{company}/accounts/@new';
		this.map[ Pages.EditAccount + Event.IFS + EventStatus.Requested ] = '/company/{company}/accounts/{account}/edit';
		this.map[ Pages.Inventory + Event.IFS + EventStatus.Requested ] = '/company/{company}/inventory';
		this.map[ Pages.Vouchers + Event.IFS + EventStatus.Requested ] = '/company/{company}/vouchers';

		this.map[ DatabaseOperations.Insert + Event.IFS + EventStatus.Succeeded + Event.IFS + 'Company' ] = '/user/companies';
	}


}
