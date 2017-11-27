import { SerialNumber } from "./serial-number.model";

export class VoucherType
{

    public $key: string;
    public type: VoucherType;
    public serialNumber: SerialNumber;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.type = object.type ? object.type : null;
        this.serialNumber = object.serialNumber ? object.serialNumber : new SerialNumber();
    }

}