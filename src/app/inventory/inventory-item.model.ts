import { Tax } from "../shared/tax.model";

export enum SupplyType
{
    Goods,
    Services
}

export class InventoryItem
{
    public $key: string;
    public id: string;
    public name: string;
    public parentKey: string;
    public supplyType: SupplyType;
    public units: number;
    public unitOfMeasure: string;
    public buyingPrice: number;
    public sellingPrice: number;
    public taxes: Array<Tax>;

    constructor ( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.id = object.id ? object.id : '';
        this.name = object.name ? object.name : '';
        this.parentKey = object.parentKey ? object.parentKey : null;
        this.supplyType = object.supplyType ? SupplyType[ <string> object.supplyType ] : SupplyType.Goods;
        this.units = object.units ? object.units : 0;
        this.unitOfMeasure = object.unitOfMeasure ? object.unitOfMeasure : '';
        this.buyingPrice = object.buyingPrice ? object.buyingPrice : 0;
        this.sellingPrice = object.sellingPrice ? object.sellingPrice : 0;
        this.taxes = object.taxes ? object.taxes : new Array<Tax>();
    }

    public get supplyTypeText (): string
    {
        return SupplyType[ this.supplyType ];
    }

}