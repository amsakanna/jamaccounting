import { Address } from "./address.model";
import { Tax } from "./tax.model";

export class Account
{

    public $key: string;
    public name: string;
    public parentKey: string;
    public description: string;
    public holderName: string;
    public number: string;
    public address: Address;
    
    constructor( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.name = object.name ? object.name : '';
        this.parentKey = object.parentKey ? object.parentKey : null;
        this.description = object.description ? object.description : '';
        this.number = object.number ? object.number : '';
        this.holderName = object.holderName ? object.holderName : '';
        this.address = object.address ? object.address : object.addressKey
            ? new Address( { $key: object.addressKey} ) : new Address();
    }

}
