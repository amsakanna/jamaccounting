import { IData } from "../../jam-firestore/models/i-data.model";
import { Address } from "./address.model";
import { AccountBook } from "./account-book.model";

export class Company implements IData
{

    public key: string;
    public id: string;
    public password: string;
    public name: string;
    public owner: string;
    public address: Address;
    public logo: string;
    public cin: string;
    public pan: string;
    public gstin: string;
    public status: string;

    constructor( object?: any )
    {
        object = object || {};

        this.key = object.key || '';
        this.id = object.id || '';
        this.password = object.password || '';
        this.name = object.name || '';
        this.owner = object.owner || '';
        this.address = object.address ? object.address : object.addressKey
            ? new Address( { key: object.addressKey} ) : new Address();
        this.logo = object.logo || '';
        this.cin = object.cin || '';
        this.pan = object.pan || '';
        this.gstin = object.gstin || '';
        this.status = object.status || '';
    }

    public toObject()
    {
        return {
            key: this.key,
            id: this.id,
            name: this.name,
            owner: this.owner,
            addressKey: this.address.key,
            logo: this.logo,
            cin: this.cin,
            pan: this.pan,
            gstin: this.gstin,
            status: this.status
        };
    }

}
