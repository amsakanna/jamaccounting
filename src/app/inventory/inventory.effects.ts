import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { InventoryModuleState, inventoryActions } from './inventory.store';
import { Inventory } from '../model';
import { InventoryFormComponent } from "./inventory-form.component";

@Injectable()
export class InventoryEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public load$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public selectAfterCrud$: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog$: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog$: Observable<any>;

	constructor (
		private actions$: Actions<JamEntityAction<Inventory>>,
		private rootStore: Store<InventoryModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */
		this.initialize$ = this.actions$.ofType( inventoryActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ inventoryActions.Initialized(), inventoryActions.Load() ] );

		this.load$ = this.actions$.ofType( inventoryActions.load )
			.switchMap( action => this.db.tables.Inventory.list )
			.switchMap( list => this.db.tables.Product.list, ( outerValue, innerValue ) => ( { inventoryList: outerValue, productList: innerValue } ) )
			.switchMap( result => this.db.tables.TaxGroup.list, ( outerValue, innerValue ) => ( { ...outerValue, taxGroupList: innerValue } ) )
			.map( result => ( {
				...result,
				inventoryList: result.inventoryList
					.map( inventory =>
					{
						const product = result.productList.find( product => product.key == inventory.productKey ) || null;
						return {
							...inventory,
							name: product.name,
							product: product,
							taxGroup: result.taxGroupList.find( taxGroup => taxGroup.key == inventory.taxGroupKey ) || null
						} as Inventory;
					} )
			} ) )
			.map( result => inventoryActions.Loaded( result.inventoryList, { taxGroupList: result.taxGroupList } ) );

		/**
		 * Select Effects
		 */
		this.selectAfterCrud$ = this.actions$.ofType( inventoryActions.loaded, inventoryActions.added, inventoryActions.modified, inventoryActions.removed )
			.map( action => inventoryActions.Select() );

		/**
		 * CRUD Effects
		 */
		this.add$ = this.actions$.ofType( inventoryActions.add )
			.switchMap( action => this.db.tables.Inventory.insert( action.item ) )
			.map( item => item ? inventoryActions.Added( item ) : inventoryActions.AddFailed() );

		this.modify$ = this.actions$.ofType( inventoryActions.modify )
			.switchMap( action => this.db.tables.Inventory.update( action.item ) )
			.map( item => item ? inventoryActions.Modified( item ) : inventoryActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( inventoryActions.remove )
			.switchMap( action => this.db.tables.Inventory.remove( action.key ) )
			.map( item => item ? inventoryActions.Removed( item ) : inventoryActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */
		this.openDialog$ = this.actions$.ofType( inventoryActions.create, inventoryActions.edit )
			.map( action => this.dialogManager.open( InventoryFormComponent, { width: '800px', id: 'InventoryFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( inventoryActions.cancelCreate, inventoryActions.cancelEdit, inventoryActions.added, inventoryActions.modified )
			.map( action => this.dialogManager.getDialogById( 'InventoryFormComponent' ).close() );

	}
}
