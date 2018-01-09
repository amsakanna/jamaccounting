import { Data } from "../../jam/model-library";

export interface Tax extends Data
{
    name?: string;
    typeKey?: string;
    taxability?: 'Undefined' | 'Exempt' | 'NilRated' | 'Taxable';
    rate?: number;
}
