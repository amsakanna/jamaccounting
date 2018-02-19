import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { TaxTypeModuleState, taxTypeActions } from './tax-type.store';
import { TaxType } from '../model';
import { TaxTypeFormComponent } from "./tax-type-form.component";

@Injectable()
export class TaxTypeEffects
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
		private actions$: Actions<JamEntityAction<TaxType>>,
		private rootStore: Store<TaxTypeModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( taxTypeActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ taxTypeActions.Initialized(), taxTypeActions.Load() ] );

		this.load$ = this.actions$.ofType( taxTypeActions.load )
			.switchMap( action => this.db.tables.TaxType.list )
			.map( list => taxTypeActions.Loaded( list ) );

		/**
		 * Select Effects
		 */

		this.selectAfterCrud$ = this.actions$.ofType( taxTypeActions.loaded, taxTypeActions.added, taxTypeActions.modified, taxTypeActions.removed )
			.map( action => taxTypeActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( taxTypeActions.add )
			.switchMap( action => this.db.tables.TaxType.insert( action.item ) )
			.map( item => item ? taxTypeActions.Added( item ) : taxTypeActions.AddFailed() );

		this.modify$ = this.actions$.ofType( taxTypeActions.modify )
			.switchMap( action => this.db.tables.TaxType.update( action.item ) )
			.map( item => item ? taxTypeActions.Modified( item ) : taxTypeActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( taxTypeActions.remove )
			.switchMap( action => this.db.tables.TaxType.remove( action.key ) )
			.map( item => item ? taxTypeActions.Removed( item ) : taxTypeActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( taxTypeActions.create, taxTypeActions.edit )
			.map( action => this.dialogManager.open( TaxTypeFormComponent, { width: '650px', id: 'TaxTypeFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( taxTypeActions.cancelCreate, taxTypeActions.cancelEdit, taxTypeActions.added, taxTypeActions.modified )
			.map( action => this.dialogManager.getDialogById( 'TaxTypeFormComponent' ).close() );

	}
}
