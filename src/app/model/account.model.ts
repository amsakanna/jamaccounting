import { Data } from "../../jam/model-library";
import { AddressClass } from "./address-class.model";
import { Tax } from "./tax.model";

export class Account implements Data
{
    public key: string;
    public name: string;
    public id: string;
    public parentKey: string;
    public description: string;
    public holderName: string;
    public number: string;
    public address: AddressClass;

    constructor ( object?: any )
    {
        object = object ? object : {};

        this.key = object.key || '';
        this.name = object.name || '';
        this.id = object.id || '';
        this.parentKey = object.parentKey || null;
        this.description = object.description || '';
        this.number = object.number || '';
        this.holderName = object.holderName || '';
        this.address = object.addressKey ? new AddressClass( { key: object.addressKey } ) : object.address || new AddressClass();
    }

    public toObject ()
    {
        return {
            key: this.key,
            name: this.name,
            id: this.id,
            parentKey: this.parentKey,
            description: this.description
        };
    }

}
