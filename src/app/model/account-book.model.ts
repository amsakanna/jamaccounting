import { Data } from "../../jam/model-library";

export class AccountBook implements Data
{
    key: string;
    id: string;
    openingDate: Date;
    closingDate: Date;

    constructor ( object?: any )
    {
        object = object || {};

        this.key = object.key || '';
        this.id = object.id || '';
        this.openingDate = object.openingDate || null;
        this.closingDate = object.closingDate || null;
    }

    public toObject ()
    {
        return {
            key: this.key,
            id: this.id,
            openingDate: this.openingDate,
            closingDate: this.closingDate
        };
    }
}