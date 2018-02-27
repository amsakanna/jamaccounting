import { Data } from "../../jam/model-library";
import { Tax } from "./tax.model";

export interface TaxGroup extends Data
{
	name: string;
	taxesKey: string[];
	taxes?: Tax[];
}
