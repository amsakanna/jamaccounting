import { Data } from "../../jam/model-library";

export interface Address extends Data
{
	type: string;
	name: string;
	phone: string;
	email: string;
	landline?: string;
	fax?: string;
	website?: string;
	establishment?: string;
	establishmentCode?: string;
	establishmentName?: string;
	branchName?: string;
	pinCode: string;
	streetAddress: string;
	city?: string;
	state?: string;
	country?: string;
}
