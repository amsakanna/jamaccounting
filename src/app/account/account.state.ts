import { FlatTree } from '../../jam-model-library/flat-tree.model';
import { Account } from './account.model';
import { AppState } from '../app.store';
import { JamEntityState } from '../../jam-ngrx/jam-ngrx';

export interface AccountModuleState extends AppState
{
	accountState: AccountState
}

export interface AccountState extends JamEntityState<Account>
{
	tree: FlatTree<Account>
}