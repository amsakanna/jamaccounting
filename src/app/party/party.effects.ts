import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { PartyModuleState, partyActions } from './party.store';
import { Party } from '../model';
import { PartyFormComponent } from "./party-form.component";

@Injectable()
export class PartyEffects
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
		private actions$: Actions<JamEntityAction<Party>>,
		private rootStore: Store<PartyModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */

		this.initialize$ = this.actions$.ofType( partyActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [ partyActions.Initialized(), partyActions.Load() ] );

		this.load$ = this.actions$.ofType( partyActions.load )
			.switchMap( action => this.db.tables.Party.list )
			.map( list => partyActions.Loaded( list ) );

		/**
		 * Select Effects
		 */

		this.selectAfterCrud$ = this.actions$.ofType( partyActions.loaded, partyActions.added, partyActions.modified, partyActions.removed )
			.map( action => partyActions.Select() );

		/**
		 * CRUD Effects
		 */

		this.add$ = this.actions$.ofType( partyActions.add )
			.switchMap( action => this.db.tables.Party.insert( action.item ) )
			.map( item => item ? partyActions.Added( item ) : partyActions.AddFailed() );

		this.modify$ = this.actions$.ofType( partyActions.modify )
			.switchMap( action => this.db.tables.Party.update( action.item ) )
			.map( item => item ? partyActions.Modified( item ) : partyActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( partyActions.remove )
			.switchMap( action => this.db.tables.Party.remove( action.key ) )
			.map( item => item ? partyActions.Removed( item ) : partyActions.RemoveFailed() );

		/**
		 * Dialog Effects
		 */

		this.openDialog$ = this.actions$.ofType( partyActions.create, partyActions.edit )
			.map( action => this.dialogManager.open( PartyFormComponent, { width: '800px', id: 'PartyFormComponent' } ) );

		this.closeDialog$ = this.actions$.ofType( partyActions.cancelCreate, partyActions.cancelEdit, partyActions.added, partyActions.modified )
			.map( action => this.dialogManager.getDialogById( 'PartyFormComponent' ).close() );

	}
}
