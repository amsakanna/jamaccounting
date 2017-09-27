import { Taxability } from "../app.enum";

export class Tax
{
    public $key: string;
    public subjectKey: string;
    public name: string;
    public fullName: string;
    public taxability: Taxability;
    public effectiveDate: Date;
    public rate: number;
    public amount: number;
    
    constructor( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.subjectKey = object.subjectKey ? object.subjectKey : '';
        this.name = object.name ? object.name : '';
        this.fullName = object.fullName ? object.fullName : '';
        this.taxability = object.taxability ? Taxability[<string>object.taxability] : Taxability.Undefined;
        this.effectiveDate = object.effectiveDate ? object.effectiveDate : new Date();
        this.rate = object.rate ? object.rate : 0;
        this.amount = object.amount ? object.amount : 0;
    }
}
