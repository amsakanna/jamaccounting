import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { Tax } from '../model';

export interface TaxModuleState extends CompanyModuleState
{
	taxState: TaxState
}

export interface TaxState extends JamEntityState<Tax> { }