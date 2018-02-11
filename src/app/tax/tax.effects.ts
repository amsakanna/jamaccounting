import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { switchMapResultSelector } from "../../jam/functions";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TaxModuleState, TaxState } from './tax.state';
import { taxActions } from './tax.action';
import { Tax, Pages } from '../model';
import { TaxFormComponent } from "./tax-form.component";
import { JamEntityAction } from "../../jam/ngrx";

@Injectable()
export class TaxEffects
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

	private formDialog: MatDialogRef<TaxFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<TaxModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Tax.list )
			.switchMap( list => this.db.tables.TaxType.list, ( outerValue, innerValue ) => ( { taxList: outerValue, taxTypeList: innerValue } ) )
			.map( result => taxActions.Initialized( result.taxList, { taxTypeList: result.taxTypeList } ) );

		this.initialized$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.initialized )
			.withLatestFrom( this.store.select( state => state.taxState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => taxActions.Select() );

		this.select$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.select )
			.withLatestFrom( this.store.select( state => state.taxState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? taxActions.Selected( selectedItem ) : taxActions.SelectFailed() );

		this.selected$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.selected )
			.map( action =>
			{
				const param = { key: 'tax', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.TaxDetail, [ param ] );
			} );

		this.create$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.create )
			.map( action => this.formDialog = this.dialog.open( TaxFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelCreate$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.add )
			.switchMap( action => this.db.tables.Tax.insert( action.item ) )
			.map( item => taxActions.Added( item ) );

		this.added$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.edit )
			.map( action => this.formDialog = this.dialog.open( TaxFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.modify )
			.switchMap( action => this.db.tables.Tax.update( action.item ) )
			.map( item => taxActions.Modified( item ) );

		this.modified$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.remove )
			.switchMap( action => this.db.tables.Tax.remove( action.key ) )
			.map( item => item ? taxActions.Removed( item ) : taxActions.RemoveFailed() );

		this.removed$ = this.actions$.ofType<JamEntityAction<Tax>>( taxActions.removed )
			.map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => taxActions.Select() );

	}
}
