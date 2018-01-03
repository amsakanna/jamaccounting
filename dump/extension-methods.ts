export { }

declare global
{

	interface Array<T>
	{
		contains ( item: T ): boolean;
	}

	interface String
	{
		contains ( searchString: string, ignoreCase?: boolean ): boolean;
	}

	interface Number
	{
		percentOf ( amount: number ): number;
	}

	interface FileReaderEventTarget extends EventTarget
	{
		result: string
	}

	interface FileReaderEvent extends Event
	{
		target: FileReaderEventTarget;
		getMessage (): string;
	}

}

Array.prototype.contains = function ( item )
{
	return this.indexOf( item ) >= 0;
};

String.prototype.contains = function ( searchString, ignoreCase?)
{
	if ( ignoreCase ) {
		return this.toLowerCase().indexOf( searchString.toLowerCase() ) >= 0;
	}
	else
		return this.indexOf( searchString ) >= 0;
}

Number.prototype.percentOf = function ( amount )
{
	return ( this / 100 ) * amount;
}
