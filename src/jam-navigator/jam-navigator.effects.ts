import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { KeyValue } from "../jam-model-library/jam-model-library";
import { NavigatorState, NavigatorModuleState } from './jam-navigator.state';
import { NavigatorActionTypes, NavigatorAction } from './jam-navigator.actions';
import { flattenTree, concatUnique } from '../jam-functions/jam-functions';

@Injectable()
export class NavigatorEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public navigate$: Observable<Action>;
	@Effect() public routeResolved$: Observable<Action>;
	@Effect() public navigateBack$: Observable<Action>;

	constructor ( private actions$: Actions,
		private store: Store<NavigatorModuleState>,
		private router: Router )
	{

		this.initialize$ = this.actions$.ofType<NavigatorAction.Initialize>( NavigatorActionTypes.initialize )
			.switchMap( action =>
			{
				console.log( ' ----------------reached ' );
				return this.router.events
					.filter( event => event instanceof NavigationEnd )
					.map( ( event: NavigationEnd ) => event.urlAfterRedirects );
			} )
			.map( newUrl =>
			{
				const rootRoute = this.router.routerState.root.firstChild;
				const params = this.getParams( rootRoute );
				return new NavigatorAction.Navigated( newUrl, params );
			} );

		this.navigate$ = this.actions$.ofType<NavigatorAction.Navigate>( NavigatorActionTypes.navigate )
			.withLatestFrom( this.store.select( state => state.navigatorState ) )
			.map( ( [ action, state ] ) =>
			{
				console.log( action.page, state.pages );
				const pageNotFound = Object.keys( state.pages ).findIndex( key => state.pages[ key ] === action.page ) < 0;
				if ( pageNotFound ) return new NavigatorAction.RouteResolveFailed();
				const allParams = KeyValue.concatUnique( action.params || new Array<KeyValue>(), state.params || new Array<KeyValue>() );
				console.log( allParams );
				const url = action.page
					.split( '/' )
					.map( urlPathItem => ( allParams.find( param => ( ':' + param.key ) == urlPathItem ) || new KeyValue( 'dummy', urlPathItem ) ).value )
					.join( '/' );
				console.log( 'url', url );
				return new NavigatorAction.RouteResolved( url, allParams );
			} );

		this.routeResolved$ = this.actions$.ofType<NavigatorAction.RouteResolved>( NavigatorActionTypes.routeResolved )
			.switchMap( action =>
			{
				console.log( 'url', action.page );
				return Observable.fromPromise( this.router.navigateByUrl( action.page ) );
			} )
			.filter( navigated => navigated === null )
			.map( navigated => new NavigatorAction.NavigateRejected( 'duplicate request' ) );

		this.navigateBack$ = this.actions$.ofType( NavigatorActionTypes.navigateBack )
			.withLatestFrom( this.store.select( state => state.navigatorState ) )
			.switchMap( ( [ action, state ] ) => this.router.navigateByUrl( state.previousPage ) )
			.filter( navigated => navigated === null )
			.map( navigated => new NavigatorAction.NavigateRejected( 'duplicate request' ) );

		console.log( '------------------- initializing' );

	}

	private getParams ( route: ActivatedRoute ): KeyValue[]
	{
		if ( !route ) return [];
		const params = flattenTree( [ route ], 'params', 'children' )
			.map( props => Object.keys( props )
				.filter( propName => propName == '_value' )
				.map( _value => props[ _value ] )
				.map( param => Object.keys( param )
					.map( key => new KeyValue( key, param[ key ] ) ) ) );

		var pa = new Array();
		params.forEach( param => param
			.forEach( p => pa.push( ...p ) ) );
		return pa;
	}

}