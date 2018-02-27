import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { TaxModuleState, taxActions } from './tax.store';
import { Tax } from '../model';
import { TaxFormComponent } from "./tax-form.component";

@Injectable()
export class TaxEffects
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
		private actions$: Actions<JamEntityAction<Tax>>,
		private rootStore: Store<TaxModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */
		this.initialize$ = this.actions$.ofType( taxActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ taxActions.Initialized(), taxActions.Load() ] );

		this.load$ = this.actions$.ofType( taxActions.load )
			.switchMap( action => this.db.tables.Tax.list )
			.switchMap( list => this.db.tables.TaxType.list, ( outerValue, innerValue ) => ( { list: outerValue, taxTypeList: innerValue } ) )
			.map( result => ( {
				...result,
				list: result.list.map( tax => ( {
					...tax,
					type: result.taxTypeList.find( taxTypeItem => taxTypeItem.key == tax.typeKey )
				} ) as Tax
				)
			} ) )
			.map( result => taxActions.Loaded( result.list, { taxTypeList: result.taxTypeList } ) );

		/**
		 * Select Effects
		 */
		this.selectAfterCrud$ = this.actions$.ofType( taxActions.loaded, taxActions.added, taxActions.modified, taxActions.removed )
			.map( action => taxActions.Select() );

		/**
		 * CRUD Effects
		 */
		this.add$ = this.actions$.ofType( taxActions.add )
			.switchMap( action => this.db.tables.Tax.insert( action.item ) )
			.map( item => item ? taxActions.Added( item ) : taxActions.AddFailed() );

		this.modify$ = this.actions$.ofType( taxActions.modify )
			.switchMap( action => this.db.tables.Tax.update( action.item ) )
			.map( item => item ? taxActions.Modified( item ) : taxActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( taxActions.remove )
			.switchMap( action => this.db.tables.Tax.remove( action.key ) )
			.map( item => item ? taxActions.Removed( item ) : taxActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */
		this.openDialog$ = this.actions$.ofType( taxActions.create, taxActions.edit )
			.map( action => this.dialogManager.open( TaxFormComponent, { width: '800px', id: 'TaxFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( taxActions.cancelCreate, taxActions.cancelEdit, taxActions.added, taxActions.modified )
			.map( action => this.dialogManager.getDialogById( 'TaxFormComponent' ).close() );

	}
}
