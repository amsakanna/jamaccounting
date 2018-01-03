import { Data } from "../../jam/model-library";

export interface Tax extends Data
{
    subjectKey: string;
    name: string;
    fullName: string;
    taxability: 'Undefined' | 'Exempt' | 'NilRated' | 'Taxable';
    effectiveDate: Date;
    rate: number;
    amount: number;
}
