import { Data } from "../../jam/model-library";
import { Product } from "./product.model";
import { Tax } from "./tax.model";

export interface Inventory extends Data
{
    productKey: string;
    supplyType: 'Goods' | 'Services';
    units: number;
    buyingPrice: number;
    sellingPrice: number;
    taxKeys: string[];
}