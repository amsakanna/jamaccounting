import { AppState } from "../app.store";
import { UserModuleState } from "../user";
import { JamEntityState } from "../../jam/ngrx";
import { Company } from "../model";

export interface CompanyModuleState extends AppState, UserModuleState
{
	companyState: CompanyState;
}

export interface CompanyState extends JamEntityState<Company> { }