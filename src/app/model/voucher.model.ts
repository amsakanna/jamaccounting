import { Data } from "../../jam/model-library";
import { Party } from "./party.model";
import { VoucherLine } from "./voucher-line.model";

export interface Voucher extends Data
{
    partyKey: string;
    party?: Party;
    transactionDate: string;
    lines: VoucherLine[];
    subtotal: number;
    discount?: number;
    discountAmount?: number;
    adjustment?: number;
    total: number;
    deliveryKey?: string;
    referenceNumber?: string;
    narration?: string;
}
