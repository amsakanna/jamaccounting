import { Inventory } from "./inventory.model";

export interface VoucherLine
{
	sno?: number;
	inventoryKey?: string;
	inventory?: Inventory;
	units?: number;
	discount?: number;
	isFlatDiscount?: boolean;
	amount?: number;
}
