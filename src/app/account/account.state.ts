import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { Account } from '../model';
import { FlatTree } from '../../jam/model-library';

export interface AccountModuleState extends CompanyModuleState
{
	accountState: AccountState
}

export interface AccountState extends JamEntityState<Account>
{
	tree: FlatTree<Account>
}