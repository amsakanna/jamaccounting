import { Data } from "../../jam/model-library";
import { Account } from "./account.model";
import { VoucherType } from "./voucher-type.model";

export interface Voucher extends Data
{
    creditor: Account;
    debtor: Account;
    transactionDate: Date;
    amount: number;
    type: VoucherType;
}