import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from "angularfire2/firestore";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { DatabaseModuleState } from './database.state';
import { DatabaseActionTypes, DbAction } from './database.actions';
import { concatPaths } from "../../jam/functions";
import { Data, TableBase } from "../../jam/model-library";
import { Table } from "./table.model";
import { Database } from "./database.model";

@Injectable()
export class DatabaseEffects
{
	@Effect() public initialize$: Observable<Action>;
	// @Effect( { dispatch: false } ) public enterCollection$: Observable<Action>;
	// @Effect( { dispatch: false } ) public exitCollection$: Observable<Action>;

	constructor ( private actions$: Actions,
		private store: Store<DatabaseModuleState>,
		private firestore: AngularFirestore )
	{

		this.initialize$ = this.actions$.ofType<DbAction.Initialize>( DatabaseActionTypes.initialize )
			.withLatestFrom( store.select( state => state.databaseState.metadataPath ) )
			.map( ( [ action, stateMetadataPath ] ) => action.metadataPath || stateMetadataPath )
			.switchMap( metadataPath => this.firestore
				.doc<Database>( metadataPath )
				.valueChanges().take( 1 )
				.map( database => Object.assign( database, { metadataPath: metadataPath } ) ) )
			.switchMap( ( database: Database ) => this.firestore
				.collection<TableBase>( concatPaths( database.metadataPath, 'Table' ) )
				.valueChanges().take( 1 )
				.map( tables => tables
					.map( table => new Table<Data>( this.firestore, table.name, concatPaths( database.path, table.path ) ) ) )
				.map( tables => Object.assign( database, { tables: tables } ) ) )
			.map( ( database: Database ) => database ? new DbAction.Initialized( database ) : new DbAction.InitializeFailed() );

		// this.enterCollection$ = this.actions$.ofType<DbAction.EnterCollection>( DatabaseActionTypes.enterCollection )
		// 	.withLatestFrom( store.select( state => state.databaseState.tables ) )
		// 	.map( ( [ action, tables ] ) => tables
		// 		.map( table => table.resolvePath( action.collectionName, action.documentKey ) ) )
		// 	.map( table => null )

	}
}
