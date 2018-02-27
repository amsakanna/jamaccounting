import { Data } from "../../jam/model-library";

export interface VoucherLine extends Data
{
	sno?: number;
	inventoryKey?: string;
	quantity?: number;
	rate?: number;
	discount?: number;
	amount?: number;
}
