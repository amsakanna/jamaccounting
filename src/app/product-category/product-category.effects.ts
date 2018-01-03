import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ProductCategoryModuleState, ProductCategoryState } from './product-category.state';
import { DatabaseService } from "../shared/database.service";
import { ProductCategoryActionTypes, ProductCategoryAction } from './product-category.actions';
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { ProductCategory, Pages } from '../model';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { ProductCategoryFormComponent } from "./product-category-form.component";

@Injectable()
export class ProductCategoryEffects
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

	private formDialog: MatDialogRef<ProductCategoryFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<ProductCategoryModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<ProductCategoryAction.Initialize>( ProductCategoryActionTypes.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.ProductCategory.list )
			.map( ( list ) => new ProductCategoryAction.Initialized( list ) );

		this.initialized$ = this.actions$.ofType<ProductCategoryAction.Initialized>( ProductCategoryActionTypes.initialized )
			.withLatestFrom( this.store.select( state => state.productCategoryState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => new ProductCategoryAction.Select() );

		this.select$ = this.actions$.ofType<ProductCategoryAction.Select>( ProductCategoryActionTypes.select )
			.withLatestFrom( this.store.select( state => state.productCategoryState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? new ProductCategoryAction.Selected( selectedItem ) : new ProductCategoryAction.SelectFailed() );

		this.selected$ = this.actions$.ofType<ProductCategoryAction.Selected>( ProductCategoryActionTypes.selected )
			.map( action =>
			{
				const param = { key: 'product-category', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.ProductCategory, [ param ] );
			} );

		this.cancelCreate$ = this.actions$.ofType<ProductCategoryAction.CancelCreate>( ProductCategoryActionTypes.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.create$ = this.actions$.ofType<ProductCategoryAction.Create>( ProductCategoryActionTypes.create )
			.map( action => this.formDialog = this.dialog.open( ProductCategoryFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<ProductCategoryAction.Add>( ProductCategoryActionTypes.add )
			.switchMap( action => this.db.tables.ProductCategory.insert( action.item ) )
			.map( item => new ProductCategoryAction.Added( item ) );

		this.added$ = this.actions$.ofType<ProductCategoryAction.Added>( ProductCategoryActionTypes.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<ProductCategoryAction.Edit>( ProductCategoryActionTypes.edit )
			.map( action => this.formDialog = this.dialog.open( ProductCategoryFormComponent, {
				width: '800px',
				position: { bottom: '150px' }
			} ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<ProductCategoryAction.CancelEdit>( ProductCategoryActionTypes.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<ProductCategoryAction.Modify>( ProductCategoryActionTypes.modify )
			.switchMap( action => this.db.tables.ProductCategory.update( action.item ) )
			.map( item => new ProductCategoryAction.Modified( item ) );

		this.modified$ = this.actions$.ofType<ProductCategoryAction.Modified>( ProductCategoryActionTypes.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<ProductCategoryAction.Remove>( ProductCategoryActionTypes.remove )
			.switchMap( action => this.db.tables.ProductCategory.remove( action.key ) )
			.map( item => item ? new ProductCategoryAction.Removed( item ) : new ProductCategoryAction.RemoveFailed );

		this.removed$ = this.actions$.ofType<ProductCategoryAction.Removed>( ProductCategoryActionTypes.removed )
			.map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => new ProductCategoryAction.Select() );

	}
}