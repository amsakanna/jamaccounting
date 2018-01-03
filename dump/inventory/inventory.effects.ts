import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { InventoryModuleState, InventoryState } from './inventory.state';
import { DatabaseService } from "../shared/database.service";
import { InventoryActionTypes, InventoryAction } from './inventory.actions';
import { NavigatorAction } from "../../jam/navigator";
import { InventoryItem, Pages } from '../model';
import { FlatTree } from "../../jam/model-library";

@Injectable()
export class InventoryEffects
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

	constructor ( private actions$: Actions, private store: Store<InventoryModuleState>, private db: DatabaseService )
	{

		this.initialize$ = this.actions$.ofType( InventoryActionTypes.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.InventoryItem.list )
			.withLatestFrom( this.store.select( state => state.inventoryState ) )
			.map( ( [ list, state ] ) =>
			{
				const rootInventory = list.find( item => item.product.categoryKey == null ) || new InventoryItem();
				const tree = new FlatTree<InventoryItem>( list, rootInventory.key, null, null, null, state.itemBeingSelectedKey );
				return new InventoryAction.Initialized( list, null, tree )
			} );

		this.initialized$ = this.actions$.ofType( InventoryActionTypes.initialized )
			.withLatestFrom( this.store.select( state => state.inventoryState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => new InventoryAction.Select() );

		this.select$ = this.actions$.ofType<InventoryAction.Select>( InventoryActionTypes.select )
			.withLatestFrom( this.store.select( state => state.inventoryState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? new InventoryAction.Selected( selectedItem ) : new InventoryAction.SelectFailed() );

		this.selected$ = this.actions$.ofType<InventoryAction.Selected>( InventoryActionTypes.selected )
			.map( action =>
			{
				const param = { key: 'inventory', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.Inventory, [ param ] );
			} );

		this.edit$ = this.actions$.ofType<InventoryAction.Edit>( InventoryActionTypes.edit )
			.withLatestFrom( this.store.select( state => state.inventoryState.selectedItem ) )
			.filter( ( [ action, selectedItem ] ) => !!action.item || !!selectedItem )
			.map( ( [ action, selectedItem ] ) =>
			{
				const key = action.item ? action.item.key : selectedItem.key;
				const param = { key: 'inventory', value: key };
				return new NavigatorAction.Navigate( Pages.EditInventoryItem, [ param ] )
			} );

		this.cancelEdit$ = this.actions$.ofType<InventoryAction.CancelEdit>( InventoryActionTypes.cancelEdit )
			.withLatestFrom( this.store.select( state => state.inventoryState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'inventory', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Inventory, [ param ] )
			} );

		this.create$ = this.actions$.ofType( InventoryActionTypes.create )
			.map( param => new NavigatorAction.Navigate( Pages.CreateInventoryItem ) );

		this.add$ = this.actions$.ofType<InventoryAction.Add>( InventoryActionTypes.add )
			.switchMap( action => this.db.tables.InventoryItem.insert( action.item ) )
			.map( item => new InventoryAction.Added( item ) );

		this.added$ = this.actions$.ofType<InventoryAction.Added>( InventoryActionTypes.added )
			.withLatestFrom( this.store.select( state => state.inventoryState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'inventory', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Inventory, [ param ] )
			} );

		this.modify$ = this.actions$.ofType<InventoryAction.Modify>( InventoryActionTypes.modify )
			.switchMap( action => this.db.tables.InventoryItem.update( action.item ) )
			.map( item => new InventoryAction.Modified( item ) );

		this.modified$ = this.actions$.ofType<InventoryAction.Modified>( InventoryActionTypes.modified )
			.withLatestFrom( this.store.select( state => state.inventoryState.selectedItem ) )
			.map( ( [ action, selectedItem ] ) =>
			{
				const param = { key: 'inventory', value: selectedItem.key };
				return new NavigatorAction.Navigate( Pages.Inventory, [ param ] )
			} );
	}
}