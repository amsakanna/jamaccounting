import { Data } from "../../jam/model-library";

export interface Tax extends Data
{
    name: string;
    fullName: string;
    taxability: 'Undefined' | 'Exempt' | 'NilRated' | 'Taxable';
    rate: number;
    effectiveDate: Date;
}
