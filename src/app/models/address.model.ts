import { IData } from "./i-data.model";

export class Address implements IData
{

    $key: string;
    type: string;
    name: string;
    phone: string;
    establishment: string;
    establishmentCode: string;
    establishmentName: string;
    branchName: string;
    pinCode: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;

    constructor( object?: any )
    {
        object = object ? object : {};
        
        this.$key = object.$key ? object.$key : '';
        this.name = object.name ? object.name : '';
        this.phone = object.phone ? object.phone : '';
        this.establishment = object.establishment ? object.establishment : '';
        this.establishmentCode = object.establishmentCode ? object.establishmentCode : '';
        this.establishmentName = object.establishmentName ? object.establishmentName : '';
        this.branchName = object.branchName ? object.branchName : '';
        this.pinCode = object.pinCode ? object.pinCode : '';
        this.type = object.type ? object.type : '';
        this.streetAddress = object.streetAddress ? object.streetAddress : '';
        this.city = object.city ? object.city : '';
        this.state = object.state ? object.state : 'Tamil Nadu';
        this.country = object.country ? object.country : 'India';
    }

    public toObject()
    {
        return {
            $key: this.$key,
            type: this.type,
            name: this.name,
            phone: this.phone,
            establishment: this.establishment,
            establishmentCode: this.establishmentCode,
            establishmentName: this.establishmentName,
            branchName: this.branchName,
            pinCode: this.pinCode,
            streetAddress: this.streetAddress,
            city: this.city,
            state: this.state,
            country: this.country
        };
    }

}
