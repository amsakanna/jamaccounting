import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { InvoiceModuleState, invoiceActions } from './invoice.store';
import { Invoice } from '../model';
import { InvoiceFormComponent } from "./invoice-form.component";

@Injectable()
export class InvoiceEffects
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
		private actions$: Actions<JamEntityAction<Invoice>>,
		private rootStore: Store<InvoiceModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( invoiceActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ invoiceActions.Initialized(), invoiceActions.Load() ] );

		this.load$ = this.actions$.ofType( invoiceActions.load )
			.switchMap( action => this.db.tables.Invoice.list )
			.map( list => invoiceActions.Loaded( list ) );

		/**
		 * Select Effects
		 */

		this.selectAfterCrud$ = this.actions$.ofType( invoiceActions.loaded, invoiceActions.added, invoiceActions.modified, invoiceActions.removed )
			.map( action => invoiceActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( invoiceActions.add )
			.switchMap( action => this.db.tables.Invoice.insert( action.item ) )
			.map( item => item ? invoiceActions.Added( item ) : invoiceActions.AddFailed() );

		this.modify$ = this.actions$.ofType( invoiceActions.modify )
			.switchMap( action => this.db.tables.Invoice.update( action.item ) )
			.map( item => item ? invoiceActions.Modified( item ) : invoiceActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( invoiceActions.remove )
			.switchMap( action => this.db.tables.Invoice.remove( action.key ) )
			.map( item => item ? invoiceActions.Removed( item ) : invoiceActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( invoiceActions.create, invoiceActions.edit )
			.map( action => this.dialogManager.open( InvoiceFormComponent, { width: '800px', id: 'InvoiceFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( invoiceActions.cancelCreate, invoiceActions.cancelEdit, invoiceActions.added, invoiceActions.modified )
			.map( action => this.dialogManager.getDialogById( 'InvoiceFormComponent' ).close() );

	}
}
