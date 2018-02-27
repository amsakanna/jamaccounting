import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { BrandModuleState, brandActions } from './brand.store';
import { Brand } from '../model';
import { BrandFormComponent } from "./brand-form.component";

@Injectable()
export class BrandEffects
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
		private actions$: Actions<JamEntityAction<Brand>>,
		private rootStore: Store<BrandModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( brandActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ brandActions.Initialized(), brandActions.Load() ] );

		this.load$ = this.actions$.ofType( brandActions.load )
			.switchMap( action => this.db.tables.Brand.list )
			.map( list => brandActions.Loaded( list ) );

		/**
		 * Select Effects
		 */

		this.selectAfterCrud$ = this.actions$.ofType( brandActions.loaded, brandActions.added, brandActions.modified, brandActions.removed )
			.map( action => brandActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( brandActions.add )
			.switchMap( action => this.db.tables.Brand.insert( action.item ) )
			.map( item => item ? brandActions.Added( item ) : brandActions.AddFailed() );

		this.modify$ = this.actions$.ofType( brandActions.modify )
			.switchMap( action => this.db.tables.Brand.update( action.item ) )
			.map( item => item ? brandActions.Modified( item ) : brandActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( brandActions.remove )
			.switchMap( action => this.db.tables.Brand.remove( action.key ) )
			.map( item => item ? brandActions.Removed( item ) : brandActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( brandActions.create, brandActions.edit )
			.map( action => this.dialogManager.open( BrandFormComponent, { width: '800px', id: 'BrandFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( brandActions.cancelCreate, brandActions.cancelEdit, brandActions.added, brandActions.modified )
			.map( action => this.dialogManager.getDialogById( 'BrandFormComponent' ).close() );

	}
}
