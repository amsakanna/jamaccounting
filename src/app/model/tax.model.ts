import { Data } from "../../jam/model-library";
import { Taxabilities } from "./taxabilities.enum";

export interface Tax extends Data
{
    name?: string;
    typeKey?: string;
    taxability?: Taxabilities;
    rate?: number;
}
