import { DatabaseState } from './database.state';
import { DatabaseActionTypes, DbAction } from './database.actions';
import { Data, Error } from "../../jam/model-library";
import { Table } from './table.model';

const initialState: DatabaseState = {
	initialized: false,
	processing: false,
	error: new Error(),
	path: 'Data/Table',
	metadataPath: 'Metadata/Database',
	tables: []
}

export function databaseReducers ( state = initialState, action: DbAction.All )
{
	switch ( action.type ) {

		case DatabaseActionTypes.initialize:
			return {
				...state,
				metadataPath: action.metadataPath || state.metadataPath,
				initialized: false,
				processing: true
			};

		case DatabaseActionTypes.initialized:
			return {
				...state,
				path: action.database.path,
				metadataPath: action.database.metadataPath,
				tables: action.database.tables,
				initialized: true,
				processing: false
			};

		case DatabaseActionTypes.initializeFailed:
			return {
				...state,
				initialized: false,
				processing: false
			};

		case DatabaseActionTypes.enterCollection:
			state.tables.forEach( table => table.resolvePath( action.collectionName, action.documentKey ) );
			return {
				...state,
				tables: state.tables
			}

		default:
			return state;
	}
}
