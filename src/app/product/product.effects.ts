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
import { productActions } from './product.action';
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
			.map( result => productActions.Initialized( result.productList, result.productList[ 0 ] || null, { categoryList: result.productCategoryList } ) );

		this.initialized$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.initialized )
			.withLatestFrom( this.store.select( state => state.productState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => productActions.Select() );

		this.select$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.select )
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
			.map( result => result.selectedItem
				? productActions.Selected( result.selectedItem, { selectedItemCategory: result.selectedItemCategory } )
				: productActions.SelectFailed() );

		this.selected$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.selected )
			.map( action =>
			{
				const param = { key: 'product', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.Product, [ param ] );
			} );

		this.cancelCreate$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.create$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.create )
			.map( action => this.formDialog = this.dialog.open( ProductFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.add )
			.switchMap( action => this.db.tables.Product.insert( action.item ) )
			.map( item => productActions.Added( item ) );

		this.added$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.edit )
			.map( action => this.formDialog = this.dialog.open( ProductFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.modify )
			.switchMap( action => this.db.tables.Product.update( action.item ) )
			.map( item => productActions.Modified( item ) );

		this.modified$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.remove )
			.switchMap( action => this.db.tables.Product.remove( action.key ) )
			.map( item => item ? productActions.Removed( item ) : productActions.RemoveFailed() );

		this.removed$ = this.actions$.ofType<JamEntityAction<Product>>( productActions.removed )
			.map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => productActions.Select() );

	}
}