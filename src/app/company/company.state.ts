import { JamEntityState } from "../../jam-ngrx/jam-ngrx";
import { Company } from "./company.model";
import { AppState } from "../app.store";
import { UserModuleState } from "../user/user";

export interface CompanyModuleState extends AppState, UserModuleState
{
	companyState: CompanyState;
}

export interface CompanyState extends JamEntityState<Company> { }