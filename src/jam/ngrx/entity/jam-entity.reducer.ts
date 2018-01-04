import { Action } from '@ngrx/store';
import { Data } from '../../model-library';
import { JamEntityState } from './jam-entity.state';
import { JamEntityActions } from './jam-entity.actions';
import { JamEntityAdapter } from './jam-entity-adapter';
import { JamEntityAction } from './jam-entity-action.model';

export function jamEntityReducer<T extends Data, S extends JamEntityState<T>, A extends JamEntityAction<T>>(
	state: S,
	action: A,
	actions: JamEntityActions<T>,
	adapter: JamEntityAdapter<T, S>
): S
{
	switch ( action.type ) {
		case actions.initialize: return adapter.initialize( state );
		case actions.initialized: return adapter.initialized( state, action.list );
		case actions.select: return adapter.select( state, action.key );
		case actions.selected: return adapter.selected( state, action.item );
		case actions.selectFailed: return adapter.selectFailed( state );
		case actions.create: return adapter.create( state );
		case actions.cancelCreate: return adapter.cancelCreate( state );
		case actions.add: return adapter.add( state, action.item );
		case actions.added: return adapter.added( state, action.item );
		case actions.addFailed: return adapter.addFailed( state );
		case actions.edit: return adapter.edit( state, action.item );
		case actions.cancelEdit: return adapter.cancelEdit( state );
		case actions.modify: return adapter.modify( state, action.item );
		case actions.modified: return adapter.modified( state, action.item );
		case actions.modifyFailed: return adapter.modifyFailed( state );
		case actions.remove: return adapter.remove( state, action.key );
		case actions.removed: return adapter.removed( state, action.item );
		case actions.removeFailed: return adapter.removeFailed( state );
		default: return state;
	}
}