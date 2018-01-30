import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { NavigatorAction } from "../../jam/navigator";
import { KeyValue } from "../../jam/model-library";
import { switchMapResultSelector } from "../../jam/functions";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { BrandModuleState, BrandState } from './brand.state';
import { brandActions } from './brand.action';
import { Brand, Pages } from '../model';
import { BrandFormComponent } from "./brand-form.component";
import { JamEntityAction } from "../../jam/ngrx";

@Injectable()
export class BrandEffects
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

	private formDialog: MatDialogRef<BrandFormComponent>;

	constructor (
		private actions$: Actions,
		private store: Store<BrandModuleState>,
		private db: DatabaseService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	)
	{

		this.initialize$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.initialize )
			.switchMap( action => this.store.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.switchMap( company => this.db.tables.Brand.list )
			.map( list => brandActions.Initialized( list ) );

		this.initialized$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.initialized )
			.withLatestFrom( this.store.select( state => state.brandState ) )
			.filter( ( [ action, state ] ) => !state.creating && !state.editing )
			.map( ( [ action, state ] ) => brandActions.Select() );

		this.select$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.select )
			.withLatestFrom( this.store.select( state => state.brandState ) )
			.map( ( [ action, state ] ) =>
			{
				const selectKey = action.key || state.itemBeingSelectedKey || ( state.initialized && state.defaultItem ? state.defaultItem.key : null );
				const alreadySelected = state.selectedItem && ( state.selectedItem.key == selectKey );
				const selectedItem = selectKey && !alreadySelected && state.initialized && state.list
					? state.list.find( item => item.key == selectKey ) || null
					: null
				return selectedItem;
			} )
			.map( selectedItem => selectedItem ? brandActions.Selected( selectedItem ) : brandActions.SelectFailed() );

		this.selected$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.selected )
			.map( action =>
			{
				const param = { key: 'brand', value: action.item ? action.item.key : '' };
				return new NavigatorAction.Navigate( Pages.BrandDetail, [ param ] );
			} );

		this.create$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.create )
			.map( action => this.formDialog = this.dialog.open( BrandFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelCreate$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.cancelCreate )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.add$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.add )
			.switchMap( action => this.db.tables.Brand.insert( action.item ) )
			.map( item => brandActions.Added( item ) );

		this.added$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.added )
			.map( action => this.formDialog.close() )
			.map( dialog => this.snackBar.open( 'item added', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.edit$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.edit )
			.map( action => this.formDialog = this.dialog.open( BrandFormComponent, { width: '800px' } ) )
			.map( dialog => null );

		this.cancelEdit$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.cancelEdit )
			.map( action => this.formDialog.close() )
			.map( dialog => null );

		this.modify$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.modify )
			.switchMap( action => this.db.tables.Brand.update( action.item ) )
			.map( item => brandActions.Modified( item ) );

		this.modified$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.modified )
			.map( action => this.formDialog.close() )
			.map( action => this.snackBar.open( 'item saved', 'Ok', { duration: 5000 } ) )
			.map( snackbar => null );

		this.remove$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.remove )
			.switchMap( action => this.db.tables.Brand.remove( action.key ) )
			.map( item => item ? brandActions.Removed( item ) : brandActions.RemoveFailed() );

		this.removed$ = this.actions$.ofType<JamEntityAction<Brand>>( brandActions.removed )
			// .map( action => this.snackBar.open( 'item removed', 'Ok', { duration: 5000 } ) )
			.map( snackbar => brandActions.Select() );

	}
}
