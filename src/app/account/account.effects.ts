import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AccountModuleState, AccountState } from './account.state';
import { DatabaseService } from "../shared/database.service";
import { AccountActionTypes, AccountAction } from './account.actions';
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue, FlatTree } from "../../jam/model-library";
import { Account, Pages } from '../model';

@Injectable()
export class AccountEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public initialized$: Observable<Action>;
	@Effect() public select$: Observable<Action>;
	@Effect() public selected$: Observable<Action>;
	@Effect() public create$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public added$: Observable<Action>;
	@Effect() public edit$: Observable<Action>;
	@Effect() public cancelEdit$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect() public modified$: Observable<Action>;

	constructor ( private actions$: Actions, private store: Store<AccountModuleState>, private db: DatabaseService )
	{

		this.initialize$ = this.actions$.ofType( AccountActionTypes.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Account.list )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.map( ( [ list, state ] ) =>
			{
				const rootAccount = list.find( item => item.parentKey == null );
				const defaultItem = list.find( item => item.id == '101' );
				const tree = new FlatTree<Account>( list, rootAccount.key, null, null, defaultItem, state.itemBeingSelectedKey || defaultItem );
				return new AccountAction.Initialized( list, defaultItem, tree )
			} );

		this.initialized$ = this.actions$.ofType( AccountActionTypes.initialized )
			.withLatestFrom( this.store.select( state => state.accountState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => new AccountAction.Select() );

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
				const param = { key: 'account', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.Account, [ param ] );
			} );

		this.edit$ = this.actions$.ofType<AccountAction.Edit>( AccountActionTypes.edit )
			.withLatestFrom( this.store.select( state => state.accountState.selectedItem ) )
			.filter( ( [ action, selectedItem ] ) => !!action.item || !!selectedItem )
			.map( ( [ action, selectedItem ] ) =>
			{
				const key = action.item ? action.item.key : selectedItem.key;
				const param = { key: 'account', value: key };
				return new NavigatorAction.Navigate( Pages.EditAccount, [ param ] )
			} );

		this.cancelEdit$ = this.actions$.ofType<AccountAction.CancelEdit>( AccountActionTypes.cancelEdit )
			.withLatestFrom( this.store.select( state => state.accountState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'account', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Account, [ param ] )
			} );

		this.create$ = this.actions$.ofType( AccountActionTypes.create )
			.map( param => new NavigatorAction.Navigate( Pages.CreateAccount ) );

		this.add$ = this.actions$.ofType<AccountAction.Add>( AccountActionTypes.add )
			.switchMap( action => this.db.tables.Account.insert( action.item ) )
			.map( item => new AccountAction.Added( item ) );

		this.added$ = this.actions$.ofType<AccountAction.Added>( AccountActionTypes.added )
			.withLatestFrom( this.store.select( state => state.accountState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'account', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Account, [ param ] )
			} );

		this.modify$ = this.actions$.ofType<AccountAction.Modify>( AccountActionTypes.modify )
			.switchMap( action => this.db.tables.Account.update( action.item ) )
			.map( item => new AccountAction.Modified( item ) );

		this.modified$ = this.actions$.ofType<AccountAction.Modified>( AccountActionTypes.modified )
			.withLatestFrom( this.store.select( state => state.accountState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'account', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Account, [ param ] )
			} );

	}
}