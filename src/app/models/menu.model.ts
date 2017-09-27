export class Menu
{

    public text: string;
    public children: Array<Menu>;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.text = object.text ? object.text : '';
        this.children = object.children ? object.children : new Array<Menu>();

    }
    
}