import { Data } from "../../jam/model-library";
import { VoucherLine } from "./voucher-line.model";

export interface Voucher extends Data
{
    partyKey: string;
    transactionDate: string;
    lines: VoucherLine[];
    subtotal: number;
    discount?: number;
    adjustment?: number;
    total: number;
    deliveryKey?: string;
    referenceNumber?: string;
    narration?: string;
}
