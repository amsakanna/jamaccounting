import { JamEntityAdapter } from '../../jam-ngrx/jam-ngrx';
import { FlatTree } from '../../jam-model-library/flat-tree.model';
import { CompanyState } from './company.state';
import { CompanyActionTypes, CompanyAction } from './company.actions';
import { Company } from './company.model';

const companyAdapter = new JamEntityAdapter<Company, CompanyState>();
const initialState = companyAdapter.getInitialState();

export function companyReducers ( state = initialState, action: CompanyAction.All ): CompanyState
{
	switch ( action.type ) {
		case CompanyActionTypes.initialize: return companyAdapter.initialize( state );
		case CompanyActionTypes.initialized: return companyAdapter.initialized( state, action.list, null );
		case CompanyActionTypes.select: return companyAdapter.select( state, action.key );
		case CompanyActionTypes.selected: return companyAdapter.selected( state, action.item );
		case CompanyActionTypes.selectFailed: return companyAdapter.selectFailed( state );
		case CompanyActionTypes.create: return companyAdapter.create( state );
		case CompanyActionTypes.cancelCreate: return companyAdapter.cancelCreate( state );
		case CompanyActionTypes.add: return companyAdapter.add( state, action.item );
		case CompanyActionTypes.added: return companyAdapter.added( state, action.item );
		case CompanyActionTypes.edit: return companyAdapter.edit( state, action.item );
		case CompanyActionTypes.cancelEdit: return companyAdapter.cancelEdit( state );
		default: return state;
	}
}