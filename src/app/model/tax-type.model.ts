import { Data } from "../../jam/model-library";
import { TaxScopes } from "./tax-scopes.enum";

export interface TaxType extends Data
{
	name: string;
	fullName?: string;
	scope: TaxScopes;
	effectiveDate?: string;
}
