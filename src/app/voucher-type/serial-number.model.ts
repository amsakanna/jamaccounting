import { NumberingMethod } from "./numbering-method.enum";

export class SerialNumber
{

    public $key: string;
    public numberingMethod: NumberingMethod;
    public startingNumber: number;
    public endingNumber: number;
    public incrementBy: number;
    public cycle: boolean;
    public digits: number;
    public prefix: string;
    public suffix: string;
    public paddingCharacter: string;
    private previousNumber: number;
    private currentNumber: number;
    public previousValue: string;
    public currentValue: string;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.numberingMethod = object.numberingMethod ? object.numberingMethod : NumberingMethod.Automatic;
        this.startingNumber = object.startingNumber ? object.startingNumber : 1;
        this.endingNumber = object.endingNumber ? object.endingNumber : null;
        this.incrementBy = object.incrementBy ? object.incrementBy : 1;
        this.cycle = object.cycle ? object.cycle : false;
        this.digits = object.digits ? object.digits : 0;
        this.prefix = object.prefix ? object.prefix : '';
        this.suffix = object.suffix ? object.suffix : '';
        this.paddingCharacter = object.paddingCharacter ? object.paddingCharacter : '';
    }

    public generateNextValue() : string
    {
        var nextValue: string;
        var nextNumber: number;

        if( this.numberingMethod != NumberingMethod.Automatic
            && this.numberingMethod != NumberingMethod.AutomaticWithOverride )
            nextNumber = null;

        nextNumber = this.currentNumber + this.incrementBy;

        if( this.endingNumber && nextNumber > this.endingNumber )
            nextNumber = this.cycle ? this.startingNumber : null;

        nextValue = nextNumber.toString().padStart( this.digits, this.paddingCharacter );
        nextValue = this.prefix + nextValue + this.suffix;

        return nextValue;
    }

}