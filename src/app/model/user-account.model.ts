import { Data } from "../../jam/model-library";
import { User } from "../../jam/auth";

export class UserAccount implements Data
{
    public key: string;
    public user: User;
    public companies: Array<string>;

    constructor ( object?: any )
    {
        object = object ? object : {};

        this.key = object.key || '';
        this.user = object.user || null;
        this.companies = object.companies || [];
    }

    toObject ()
    {
        return {
            key: this.key,
            companies: this.companies
        };
    }

}
