export class FlatTree<T>
{
    public list: Array<T>;
    public keyName: string;
    public parentKeyName: string;
    public root: T;
    public defaultItem: T;
    public selectedItem: T;

    constructor( list: Array<T>, rootKey: string, keyName?: string, parentKeyName?: string )
    {
        this.list = list ? list : new Array<T>();
        this.keyName = keyName ? keyName : '$key';
        this.parentKeyName = parentKeyName ? parentKeyName : 'parentKey' ;
        this.defaultItem = null;
        this.selectedItem = null;
        this.root = this.list.find( listItem => listItem[this.keyName] == rootKey );
    }

    public getItem( item: T | string ) : T
    {
        return item
            ? typeof(item) === 'string'
                ? this.list.find( listItem => listItem[this.keyName] == item )
                : this.list.find( listItem => listItem[this.keyName] == item[this.keyName] )
            : null;
    }

    public getAncestors( item: T | string ) : Array<T>
    {
        if ( ! (item = this.getItem( item ) ) ) return;
        var parent = item;
        var ancestors = new Array<T>();
        while( parent[this.keyName] != this.root[this.keyName] )
        {
            parent = this.getParent( parent );
            if( parent )
                ancestors.push( parent );
            else
                break;
        }
        return ancestors;
    }

    public isAncestor( item: T | string, ancestor: T | string ) : boolean
    {
        if ( ! (item = this.getItem( item ) ) ) return;
        if ( ! (ancestor = this.getItem( ancestor ) ) ) return;
        var parent = item;
        var isAncestor = false;
        while( parent[this.keyName] != this.root[this.keyName] )
        {
            parent = this.getParent( parent );
            if( isAncestor = (parent == ancestor) )
                break;
        }
        return isAncestor;
    }

    public getParent( item: T | string ) : T
    {
        if ( ! (item = this.getItem( item ) ) ) return;
        return this.list.find( listItem => listItem[this.keyName] == item[this.parentKeyName] );
    }

	public getSiblings( item: T | string ) : Array<T>
	{
        if ( ! (item = this.getItem( item ) ) ) return;
        item = this.getParent( item );
		return this.list.filter( listItem => listItem[this.parentKeyName] == item[this.keyName] );
    }

	public getChildren( item: T | string ) : Array<T>
	{
        if ( ! (item = this.getItem( item ) ) ) return;
		return this.list.filter( listItem => listItem[this.parentKeyName] == item[this.keyName] );
    }

    public getPath( item: T | string ) : Array<T>
    {
        var path = new Array<T>();
        var parent: T;
        
        if ( ! (item = this.getItem( item ) ) ) return path;

        while( item[this.keyName] != this.root[this.keyName] )
        {
            parent = this.getParent( item );
            path.push( parent );
            item = parent;
        }
        return path;
    }
    
	public select( item: T | string ) : T
	{
        item = this.getItem( item );
        this.selectedItem = this.isValid( item ) ? this.getItem( item ) : this.defaultItem;        
        return this.selectedItem;
    }

    public get selectedFamily(): T
    {
        return this.getParent( this.selectedItem );
    }

    public get rootReached(): boolean
    {
        return ( this.selectedFamily == this.root );
    }

    public isValid( item: T | string ) : boolean
    {
        item = this.getItem( item );
        return !! this.getParent( item );
    }

}