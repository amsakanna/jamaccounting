import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from "@angular/material";
import { KeyValue } from "../../jam/model-library";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { NavigatorAction } from "../../jam/navigator";
import { JamEntityAction } from "../../jam/ngrx";
import { ProductModuleState, productActions } from './product.store';
import { Product, Pages } from '../model';
import { ProductFormComponent } from "./product-form.component";
import { urlParamKey, module } from './product.config';
import { CoreAction } from "../core";

@Injectable()
export class ProductEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public initialized$: Observable<Action>;
	// @Effect() public select$: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog$: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog$: Observable<any>;
	@Effect() public add$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public selectAfterCrud$: Observable<Action>;
	private formDialog: MatDialogRef<ProductFormComponent>;

	constructor (
		private actions$: Actions<JamEntityAction<Product>>,
		private store: Store<ProductModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog
	)
	{

		console.log( 'product-effects' );

		this.initialize$ = this.actions$.ofType( productActions.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Product.list )
			.switchMap( list => this.db.tables.ProductCategory.list, ( outerValue, innerValue ) => ( { productList: outerValue, productCategoryList: innerValue } ) )
			.switchMap( result => this.db.tables.Brand.list, ( outerValue, innerValue ) => ( { ...outerValue, brandList: innerValue } ) )
			.map( result => productActions.Initialized( result.productList, { categoryList: result.productCategoryList, brandList: result.brandList } ) );

		this.initialized$ = this.actions$.ofType( productActions.initialized )
			.map( action => productActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( productActions.add )
			.switchMap( action => this.db.tables.Product.insert( action.item ) )
			.map( item => item ? productActions.Added( item ) : productActions.AddFailed() );

		this.modify$ = this.actions$.ofType( productActions.modify )
			.switchMap( action => this.db.tables.Product.update( action.item ) )
			.map( item => item ? productActions.Modified( item ) : productActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( productActions.remove )
			.switchMap( action => this.db.tables.Product.remove( action.key ) )
			.map( item => item ? productActions.Removed( item ) : productActions.RemoveFailed() );

		this.selectAfterCrud$ = this.actions$.ofType( productActions.added, productActions.modified, productActions.removed )
			.map( action => productActions.Select() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( productActions.create, productActions.edit )
			.map( action => this.formDialog = this.dialog.open( ProductFormComponent, { width: '650px' } ) );

		this.closeDialog$ = this.actions$.ofType( productActions.cancelCreate, productActions.cancelEdit, productActions.added, productActions.modified )
			.map( action => this.formDialog.close() );

	}
}
