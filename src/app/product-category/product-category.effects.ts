import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { ProductCategoryModuleState, productCategoryActions } from './product-category.store';
import { ProductCategory } from '../model';
import { ProductCategoryFormComponent } from "./product-category-form.component";

@Injectable()
export class ProductCategoryEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public load$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public selectAfterLoad$: Observable<Action>;
	@Effect() public selectAfterCrud$: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog$: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog$: Observable<any>;
	private formDialog: MatDialogRef<ProductCategoryFormComponent>;

	constructor (
		private actions$: Actions<JamEntityAction<ProductCategory>>,
		private rootStore: Store<ProductCategoryModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( productCategoryActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ productCategoryActions.Initialized(), productCategoryActions.Load() ] );

		this.load$ = this.actions$.ofType( productCategoryActions.load )
			.switchMap( action => this.db.tables.ProductCategory.list )
			.map( list => productCategoryActions.Loaded( list ) );

		/**
		 * Select Effects
		 */

		this.selectAfterLoad$ = this.actions$.ofType( productCategoryActions.loaded )
			.map( action => productCategoryActions.Select() );

		this.selectAfterCrud$ = this.actions$.ofType( productCategoryActions.added, productCategoryActions.modified, productCategoryActions.removed )
			.map( action => productCategoryActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( productCategoryActions.add )
			.switchMap( action => this.db.tables.ProductCategory.insert( action.item ) )
			.map( item => item ? productCategoryActions.Added( item ) : productCategoryActions.AddFailed() );

		this.modify$ = this.actions$.ofType( productCategoryActions.modify )
			.switchMap( action => this.db.tables.ProductCategory.update( action.item ) )
			.map( item => item ? productCategoryActions.Modified( item ) : productCategoryActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( productCategoryActions.remove )
			.switchMap( action => this.db.tables.ProductCategory.remove( action.key ) )
			.map( item => item ? productCategoryActions.Removed( item ) : productCategoryActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( productCategoryActions.create, productCategoryActions.edit )
			.map( action => this.formDialog = this.dialogManager.open( ProductCategoryFormComponent, { width: '650px' } ) );

		this.closeDialog$ = this.actions$.ofType( productCategoryActions.cancelCreate, productCategoryActions.cancelEdit, productCategoryActions.added, productCategoryActions.modified )
			.map( action => this.formDialog.close() );

	}
}
