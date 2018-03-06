import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { ProductModuleState, productActions } from './product.store';
import { Product, Inventory } from '../model';
import { ProductFormComponent } from "./product-form.component";

@Injectable()
export class ProductEffects
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
		private actions$: Actions<JamEntityAction<Product>>,
		private rootStore: Store<ProductModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */
		this.initialize$ = this.actions$.ofType( productActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ productActions.Initialized(), productActions.Load() ] );

		this.load$ = this.actions$.ofType( productActions.load )
			.switchMap( action => this.db.tables.Product.list )
			.switchMap( list => this.db.tables.ProductCategory.list, ( outerValue, innerValue ) => ( { list: outerValue, productCategoryList: innerValue } ) )
			.switchMap( result => this.db.tables.Brand.list, ( outerValue, innerValue ) => ( { ...outerValue, brandList: innerValue } ) )
			.map( result => ( {
				...result,
				list: result.list.map( product => ( {
					...product,
					category: result.productCategoryList.find( productCategoryItem => productCategoryItem.key == product.categoryKey ),
					brand: result.brandList.find( brandItem => brandItem.key == product.brandKey )
				} ) as Product )
			} ) )
			.map( result => productActions.Loaded( result.list, { categoryList: result.productCategoryList, brandList: result.brandList } ) );

		/**
		 * Select Effects
		 */
		this.selectAfterCrud$ = this.actions$.ofType( productActions.loaded, productActions.added, productActions.modified, productActions.removed )
			.map( action => productActions.Select() );

		/**
		 * CRUD Effects
		 */
		this.add$ = this.actions$.ofType( productActions.add )
			.switchMap( action => this.db.tables.Product.insert( action.item ) )
			.switchMap( item => this.db.tables.Inventory.insert( ( {
				productKey: item.key,
				supplyType: null,
				units: null,
				buyingPrice: null,
				sellingPrice: null,
				taxGroupKey: null
			} ) as Inventory ), ( outerValue, innerValue ) => outerValue )
			.map( item => item ? productActions.Added( item ) : productActions.AddFailed() );

		this.modify$ = this.actions$.ofType( productActions.modify )
			.switchMap( action => this.db.tables.Product.update( action.item ) )
			.map( item => item ? productActions.Modified( item ) : productActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( productActions.remove )
			.switchMap( action => this.db.tables.Product.remove( action.key ) )
			.switchMap( item => this.db.tables.Inventory.remove( item.key, 'productKey' ), ( outerValue, innerValue ) => outerValue )
			.map( item => item ? productActions.Removed( item ) : productActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */
		this.openDialog$ = this.actions$.ofType( productActions.create, productActions.edit )
			.map( action => this.dialogManager.open( ProductFormComponent, { width: '800px', id: 'ProductFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( productActions.cancelCreate, productActions.cancelEdit, productActions.added, productActions.modified )
			.map( action => this.dialogManager.getDialogById( 'ProductFormComponent' ).close() );

	}
}
