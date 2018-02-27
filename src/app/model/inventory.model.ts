import { Data } from "../../jam/model-library";
import { Product } from "./product.model";
import { SupplyTypes } from "./supply-types.enum";
import { TaxGroup } from "./tax-group.model";

export interface Inventory extends Data
{
    name$?: string;
    productKey: string;
    product?: Product;
    supplyType: SupplyTypes;
    units: number;
    buyingPrice?: number;
    sellingPrice?: number;
    taxGroupKey?: string;
    taxGroup?: TaxGroup;
}
