import { Data } from "../../jam/model-library";
import { TaxType } from "./tax-type.model";
import { TaxScopes } from "./tax-scopes.enum";

export interface Tax extends Data
{
    name: string;
    typeKey: string;
    type?: TaxType;
    rate: number;
    flatRate?: number;
    perUnits?: number;
    selected$?: boolean;
}
