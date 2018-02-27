import { Data } from "../../jam/model-library";
import { PartyTypes } from "./party-types.enum";
import { ContactName } from "./contact-name.model";
import { CompanyRegistrationTypes } from "./company-registration-types.enum";
import { Address } from "./address.model";

export interface Party extends Data
{
	type: PartyTypes;
	name: string;
	companyName?: string;
	companyRegistrationType: CompanyRegistrationTypes;
	taxNumber?: string;
	placeOfSupply?: string;
	email?: string;
	phone?: string;
	workPhone?: string;
	address?: Address;
	narration?: string;
}
