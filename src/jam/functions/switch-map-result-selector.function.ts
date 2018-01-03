export function switchMapResultSelector<T, U>( outerValue: T, innerValue: U ): { outerValue: T, innerValue: U }
{
	return ( { outerValue, innerValue } );
}