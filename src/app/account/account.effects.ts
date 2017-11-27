import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AccountModuleState, AccountState } from './account.state';
import { DatabaseService } from "../shared/database.service";
import { AccountActionTypes, AccountAction } from './account.actions';
import { NavigatorAction } from "../../jam-navigator/jam-navigator";
import { Pages } from "../shared/pages.enum";
import { KeyValue, FlatTree } from "../../jam-model-library/jam-model-library";
import { Account } from './account.model';

@Injectable()
export class AccountEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public initialized$: Observable<Action>;
	@Effect() public select$: Observable<Action>;
	@Effect() public selected$: Observable<Action>;
	@Effect() public create$: Observable<Action>;
	@Effect() public edit$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public added$: Observable<Action>;
	@Effect() public cancelEdit$: Observable<Action>;

	constructor ( private actions$: Actions, private store: Store<AccountModuleState>, private db: DatabaseService )
	{

		this.initialize$ = this.actions$.ofType( AccountActionTypes.initialize )
			.switchMap( () => this.db.tables.Account.list )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.map( ( [ list, state ] ) =>
			{
				const rootAccount = list.find( item => item.parentKey == null );
				const defaultItem = list.find( item => item.id == '101' );
				const tree = new FlatTree<Account>( list, rootAccount.key, null, null, defaultItem, state.itemBeingSelectedKey || defaultItem );
				return new AccountAction.Initialized( list, defaultItem, tree )
			} );

		this.initialized$ = this.actions$.ofType( AccountActionTypes.initialized )
			.map( () => new AccountAction.Select() );

		this.select$ = this.actions$.ofType<AccountAction.Select>( AccountActionTypes.select )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? new AccountAction.Selected( selectedItem ) : new AccountAction.SelectFailed() );

		this.selected$ = this.actions$.ofType<AccountAction.Selected>( AccountActionTypes.selected )
			.map( action =>
			{
				const params = [ new KeyValue( 'account', action.item ? action.item.key : '' ) ];
				return new NavigatorAction.Navigate( Pages.Account, params );
			} );

		this.create$ = this.actions$.ofType( AccountActionTypes.create )
			.map( params => new NavigatorAction.Navigate( Pages.CreateAccount ) );

		this.edit$ = this.actions$.ofType<AccountAction.Edit>( AccountActionTypes.edit )
			.map( action =>
			{
				const params = [ new KeyValue( 'account', action.item.key ) ];
				return new NavigatorAction.Navigate( Pages.EditAccount, params );
			} );

		this.add$ = this.actions$.ofType<AccountAction.Add>( AccountActionTypes.add )
			.switchMap( action => this.db.tables.Account.insert( action.item ) )
			.map( item => new AccountAction.Added( item ) );

		this.added$ = this.actions$.ofType( AccountActionTypes.added )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.map( ( [ action, state ] ) =>
			{
				const params = [ new KeyValue( 'account', state.selectedItem.key ) ];
				return new NavigatorAction.Navigate( Pages.Account, params )
			} );

		this.cancelEdit$ = this.actions$.ofType( AccountActionTypes.cancelEdit )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.map( ( [ action, state ] ) =>
			{
				const params = [ new KeyValue( 'account', state.selectedItem.key ) ];
				return new NavigatorAction.Navigate( Pages.Account, params )
			} );

	}
}