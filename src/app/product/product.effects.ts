import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { switchMapResultSelector } from "../../jam/functions";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ProductModuleState, ProductState } from './product.state';
import { ProductActionTypes, ProductAction } from './product.actions';
import { productActions } from './product.reducers';
import { Product, Pages } from '../model';
import { ProductFormComponent } from "./product-form.component";
import { JamEntityAction } from "../../jam/ngrx";

@Injectable()
export class ProductEffects
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

	private formDialog: MatDialogRef<ProductFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<ProductModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Product.list )
			.switchMap( list => this.db.tables.ProductCategory.list, ( outerValue, innerValue ) => ( { productList: outerValue, productCategoryList: innerValue } ) )
			.map( result => productActions.Initialized( result.productList, { categoryList: result.productCategoryList } ) );

		this.initialized$ = this.actions$.ofType<ProductAction.Initialized>( ProductActionTypes.initialized )
			.withLatestFrom( this.store.select( state => state.productState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => new ProductAction.Select() );

		this.select$ = this.actions$.ofType<ProductAction.Select>( ProductActionTypes.select )
			.withLatestFrom( this.store.select( state => state.productState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.switchMap( selectedItem => selectedItem ? this.db.tables.ProductCategory.get( selectedItem.categoryKey ) : Observable.of( null ), ( outerValue, innerValue ) => ( { selectedItem: outerValue, selectedItemCategory: innerValue } ) )
			.map( result => result.selectedItem ? new ProductAction.Selected( result.selectedItem, result.selectedItemCategory ) : new ProductAction.SelectFailed() );

		this.selected$ = this.actions$.ofType<ProductAction.Selected>( ProductActionTypes.selected )
			.map( action =>
			{
				const param = { key: 'product', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.Product, [ param ] );
			} );

		this.cancelCreate$ = this.actions$.ofType<ProductAction.CancelCreate>( ProductActionTypes.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.create$ = this.actions$.ofType<ProductAction.Create>( ProductActionTypes.create )
			.map( action => this.formDialog = this.dialog.open( ProductFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<ProductAction.Add>( ProductActionTypes.add )
			.switchMap( action => this.db.tables.Product.insert( action.item ) )
			.map( item => new ProductAction.Added( item ) );

		this.added$ = this.actions$.ofType<ProductAction.Added>( ProductActionTypes.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<ProductAction.Edit>( ProductActionTypes.edit )
			.map( action => this.formDialog = this.dialog.open( ProductFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<ProductAction.CancelEdit>( ProductActionTypes.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<ProductAction.Modify>( ProductActionTypes.modify )
			.switchMap( action => this.db.tables.Product.update( action.item ) )
			.map( item => new ProductAction.Modified( item ) );

		this.modified$ = this.actions$.ofType<ProductAction.Modified>( ProductActionTypes.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<ProductAction.Remove>( ProductActionTypes.remove )
			.switchMap( action => this.db.tables.Product.remove( action.key ) )
			.map( item => item ? new ProductAction.Removed( item ) : new ProductAction.RemoveFailed );

		this.removed$ = this.actions$.ofType<ProductAction.Removed>( ProductActionTypes.removed )
			.map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => new ProductAction.Select() );

	}
}