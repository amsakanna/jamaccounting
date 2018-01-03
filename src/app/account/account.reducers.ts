import { AccountActionTypes, AccountAction } from './account.actions';
import { JamEntityAdapter } from '../../jam/ngrx';
import { AccountState } from './account.state';
import { Account } from '../model';
import { FlatTree } from '../../jam/model-library/flat-tree.model';

const accountAdapter = new JamEntityAdapter<Account, AccountState>();
const initialState = accountAdapter.getInitialState( { tree: null } );

export function accountReducers ( state = initialState, action: AccountAction.All ): AccountState
{
	switch ( action.type ) {
		case AccountActionTypes.initialize: return accountAdapter.initialize( state );
		case AccountActionTypes.initialized: return { ...accountAdapter.initialized( state, action.list, action.defaultItem ), tree: action.tree };
		case AccountActionTypes.select: return accountAdapter.select( state, action.key );
		case AccountActionTypes.selected: return accountAdapter.selected( state, action.item );
		case AccountActionTypes.selectFailed: return accountAdapter.selectFailed( state );
		case AccountActionTypes.create: return accountAdapter.create( state );
		case AccountActionTypes.cancelCreate: return accountAdapter.cancelCreate( state );
		case AccountActionTypes.add: return accountAdapter.add( state, action.item );
		case AccountActionTypes.added: return accountAdapter.added( state, action.item );
		case AccountActionTypes.edit: return accountAdapter.edit( state, action.item );
		case AccountActionTypes.cancelEdit: return accountAdapter.cancelEdit( state );
		case AccountActionTypes.modify: return accountAdapter.modify( state, action.item );
		case AccountActionTypes.modified: return accountAdapter.modified( state, action.item );
		default: return state;
	}
}