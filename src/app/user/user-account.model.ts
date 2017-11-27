import { IData } from "../../jam-firestore/jam-firestore";
import { User } from "../../jam-auth/jam-auth";

export class UserAccount implements IData
{
    public key: string;
    public user: User;
    public companies: Array<string>;

    constructor ( object?: any )
    {
        object = object ? object : {};

        this.key = object.key || '';
        this.user = object.user || null;
        this.companies = object.companies || new Array<string>();
    }

    toObject ()
    {
        return {
            key: this.key,
            companies: this.companies
        };
    }

}
