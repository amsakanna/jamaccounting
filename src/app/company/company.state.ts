import { AppModuleState } from "../app.store";
import { UserModuleState } from "../user";
import { JamEntityState } from "../../jam/ngrx";
import { Company } from "../model";
import { KeyValue } from "../../jam/model-library";

export interface CompanyModuleState extends AppModuleState, UserModuleState
{
	companyState: CompanyState;
}

export interface CompanyState extends JamEntityState<Company>
{
	masterNames: KeyValue[];
}
