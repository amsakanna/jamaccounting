import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { switchMapResultSelector } from "../../jam/functions";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { InventoryModuleState, InventoryState } from './inventory.state';
import { InventoryActionTypes, InventoryAction } from './inventory.actions';
import { Inventory, Pages } from '../model';
import { InventoryFormComponent } from "./inventory-form.component";

@Injectable()
export class InventoryEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public initialized$: Observable<Action>;
	@Effect() public select$: Observable<Action>;
	@Effect() public selected$: Observable<Action>;
	@Effect( { dispatch: false } ) public create$: Observable<Action>;
	@Effect( { dispatch: false } ) public cancelCreate$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect( { dispatch: false } ) public added$: Observable<Action>;
	@Effect( { dispatch: false } ) public edit$: Observable<Action>;
	@Effect( { dispatch: false } ) public cancelEdit$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect( { dispatch: false } ) public modified$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public removed$: Observable<Action>;

	private formDialog: MatDialogRef<InventoryFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<InventoryModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<InventoryAction.Initialize>( InventoryActionTypes.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Inventory.list )
			.switchMap( list => this.db.tables.Tax.list, ( outerValue, innerValue ) => ( { inventoryList: outerValue, taxList: innerValue } ) )
			.map( r => new InventoryAction.Initialized( r.inventoryList, r.taxList ) );

		this.initialized$ = this.actions$.ofType<InventoryAction.Initialized>( InventoryActionTypes.initialized )
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
			.switchMap( selectedItem => selectedItem ? this.db.tables.Product.get( selectedItem.productKey ) : Observable.of( null ), ( outerValue, innerValue ) => ( { selectedItem: outerValue, selectedItemProduct: innerValue } ) )
			.switchMap( r => r.selectedItem ? this.db.tables.ProductCategory.get( r.selectedItemProduct.categoryKey ) : Observable.of( null ), ( outerValue, innerValue ) => ( { ...outerValue, selectedItemCategory: innerValue } ) )
			.map( r => r.selectedItem ? new InventoryAction.Selected( r.selectedItem, r.selectedItemProduct, r.selectedItemCategory ) : new InventoryAction.SelectFailed() );

		this.selected$ = this.actions$.ofType<InventoryAction.Selected>( InventoryActionTypes.selected )
			.map( action =>
			{
				const param = { key: 'product', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.Inventory, [ param ] );
			} );

		this.cancelCreate$ = this.actions$.ofType<InventoryAction.CancelCreate>( InventoryActionTypes.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.create$ = this.actions$.ofType<InventoryAction.Create>( InventoryActionTypes.create )
			.map( action => this.formDialog = this.dialog.open( InventoryFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<InventoryAction.Add>( InventoryActionTypes.add )
			.switchMap( action => this.db.tables.Inventory.insert( action.item ) )
			.map( item => new InventoryAction.Added( item ) );

		this.added$ = this.actions$.ofType<InventoryAction.Added>( InventoryActionTypes.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<InventoryAction.Edit>( InventoryActionTypes.edit )
			.map( action => this.formDialog = this.dialog.open( InventoryFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<InventoryAction.CancelEdit>( InventoryActionTypes.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<InventoryAction.Modify>( InventoryActionTypes.modify )
			.switchMap( action => this.db.tables.Inventory.update( action.item ) )
			.map( item => new InventoryAction.Modified( item ) );

		this.modified$ = this.actions$.ofType<InventoryAction.Modified>( InventoryActionTypes.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<InventoryAction.Remove>( InventoryActionTypes.remove )
			.switchMap( action => this.db.tables.Inventory.remove( action.key ) )
			.map( item => item ? new InventoryAction.Removed( item ) : new InventoryAction.RemoveFailed );

		this.removed$ = this.actions$.ofType<InventoryAction.Removed>( InventoryActionTypes.removed )
			.map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => new InventoryAction.Select() );

	}
}