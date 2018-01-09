import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { TaxType } from '../model';

export interface TaxTypeModuleState extends CompanyModuleState
{
	taxTypeState: TaxTypeState
}

export interface TaxTypeState extends JamEntityState<TaxType> { }