import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { TaxGroupModuleState, taxGroupActions } from './tax-group.store';
import { TaxGroup } from '../model';
import { TaxGroupFormComponent } from "./tax-group-form.component";

@Injectable()
export class TaxGroupEffects
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
		private actions$: Actions<JamEntityAction<TaxGroup>>,
		private rootStore: Store<TaxGroupModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( taxGroupActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ taxGroupActions.Initialized(), taxGroupActions.Load() ] );

		this.load$ = this.actions$.ofType( taxGroupActions.load )
			.switchMap( action => this.db.tables.TaxGroup.list )
			.switchMap( list => this.db.tables.Tax.list, ( outerValue, innerValue ) => ( { list: outerValue, taxList: innerValue } ) )
			.map( result => ( {
				...result,
				list: result.list.map( taxGroup => ( {
					...taxGroup,
					taxes: taxGroup.taxesKey.map( taxKey => result.taxList.find( taxItem => taxItem.key == taxKey ) )
				} ) ) as TaxGroup[]
			} ) )
			.map( result => taxGroupActions.Loaded( result.list, { taxList: result.taxList } ) );

		/**
		 * Select Effects
		 */

		this.selectAfterCrud$ = this.actions$.ofType( taxGroupActions.loaded, taxGroupActions.added, taxGroupActions.modified, taxGroupActions.removed )
			.map( action => taxGroupActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( taxGroupActions.add )
			.switchMap( action => this.db.tables.TaxGroup.insert( action.item ) )
			.map( item => item ? taxGroupActions.Added( item ) : taxGroupActions.AddFailed() );

		this.modify$ = this.actions$.ofType( taxGroupActions.modify )
			.switchMap( action => this.db.tables.TaxGroup.update( action.item ) )
			.map( item => item ? taxGroupActions.Modified( item ) : taxGroupActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( taxGroupActions.remove )
			.switchMap( action => this.db.tables.TaxGroup.remove( action.key ) )
			.map( item => item ? taxGroupActions.Removed( item ) : taxGroupActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( taxGroupActions.create, taxGroupActions.edit )
			.map( action => this.dialogManager.open( TaxGroupFormComponent, { width: '800px', id: 'TaxGroupFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( taxGroupActions.cancelCreate, taxGroupActions.cancelEdit, taxGroupActions.added, taxGroupActions.modified )
			.map( action => this.dialogManager.getDialogById( 'TaxGroupFormComponent' ).close() );

	}
}
