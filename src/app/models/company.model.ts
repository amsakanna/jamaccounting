import { IData } from "./i-data.model";
import { Address } from "./address.model";

export class Company implements IData
{
    
    public $key: string;
    public name: string;
    public address: Address;
    public taxNumber: string;
    
    constructor( object?: any )
    {
        object = object || {};
        
        this.$key = object.$key || '';
        this.name = object.name || '';
        this.address = object.address ? object.address : object.addressKey
            ? new Address( { $key: object.addressKey} ) : new Address();
        this.taxNumber = object.taxNumber || '';
    }
    
    public toObject()
    {
        return {
            $key: this.$key,
            name: this.name,
            addressKey: this.address.$key,
            taxNumber: this.taxNumber
        };
    }

}
