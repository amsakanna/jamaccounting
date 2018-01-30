import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { switchMapResultSelector } from "../../jam/functions";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TaxTypeModuleState, TaxTypeState } from './tax-type.state';
import { taxTypeActions } from './tax-type.action';
import { TaxType, Pages } from '../model';
import { TaxTypeFormComponent } from "./tax-type-form.component";
import { JamEntityAction } from "../../jam/ngrx";

@Injectable()
export class TaxTypeEffects
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

	private formDialog: MatDialogRef<TaxTypeFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<TaxTypeModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.TaxType.list )
			.map( list => taxTypeActions.Initialized( list ) );

		this.initialized$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.initialized )
			.withLatestFrom( this.store.select( state => state.taxTypeState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => taxTypeActions.Select() );

		this.select$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.select )
			.withLatestFrom( this.store.select( state => state.taxTypeState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? taxTypeActions.Selected( selectedItem ) : taxTypeActions.SelectFailed() );

		this.selected$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.selected )
			.map( action =>
			{
				const param = { key: 'tax-type', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.TaxTypeDetail, [ param ] );
			} );

		this.create$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.create )
			.map( action => this.formDialog = this.dialog.open( TaxTypeFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelCreate$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.add )
			.switchMap( action => this.db.tables.TaxType.insert( action.item ) )
			.map( item => taxTypeActions.Added( item ) );

		this.added$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.edit )
			.map( action => this.formDialog = this.dialog.open( TaxTypeFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.modify )
			.switchMap( action => this.db.tables.TaxType.update( action.item ) )
			.map( item => taxTypeActions.Modified( item ) );

		this.modified$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.remove )
			.switchMap( action => this.db.tables.TaxType.remove( action.key ) )
			.map( item => item ? taxTypeActions.Removed( item ) : taxTypeActions.RemoveFailed() );

		this.removed$ = this.actions$.ofType<JamEntityAction<TaxType>>( taxTypeActions.removed )
			// .map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => taxTypeActions.Select() );

	}
}
