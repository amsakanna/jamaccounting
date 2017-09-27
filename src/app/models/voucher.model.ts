import { Account } from "./account.model";
import { VoucherType } from "./voucher-type.model";

export class Voucher
{

    public $key: string;
    public accountCreditor: Account;
    public accountDebitor: Account;
    public date: Date;
    public amount: number;
    public type: VoucherType;

    constructor( object?: any )
    {
        this.$key = object.$key ? object.$key : '';
        this.accountCreditor = object.accountCreditor ? object.accountCreditor : new Account();
        this.accountDebitor = object.accountDebitor ? object.accountDebitor : new Account();
        this.date = object.date ? object.date : Date;
        this.amount = object.amount ? object.amount : '';
        this.type = object.type ? object.type : new VoucherType();
    }

}