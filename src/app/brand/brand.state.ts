import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { Brand } from '../model';

export interface BrandModuleState extends CompanyModuleState
{
	brandState: BrandState
}

export interface BrandState extends JamEntityState<Brand> { }