export function filterObject<T>( obj: T, callbackFn: ( obj: T, prop: keyof T ) => boolean ): Partial<T>
{
	var a = Object.keys( obj )
		.filter( ( prop: keyof T ) => callbackFn( obj, prop ) )
		.reduce( ( accumulator, prop ) => ( { ...accumulator, [ prop ]: obj[ prop ] } ), {} );
	console.log( a );
	return a;
}
