import { IData } from "../../jam-firestore/jam-firestore";

export class UserAccount implements IData
{
    public key: string;
    public email: string;
    public companies: Array<string>;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.key = object.key || '';
        this.email = object.email || '';
        this.companies = object.companies || new Array<string>();
    }

    toObject()
    {
        return {
            key: this.key,
            email: this.email,
            companies: this.companies
        };
    }

}
