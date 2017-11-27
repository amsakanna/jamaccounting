export class KeyValue<T = string>
{
	public key: string;
	public value: T;

	constructor ( key: string, value: T )
	{
		this.key = key;
		this.value = value;
	}

	static concatUnique<T = string>( ...arrays: KeyValue<T>[][] ): KeyValue<T>[]
	{
		return arrays.reduce( ( finalArray, array ) =>
		{
			return finalArray.concat( array.filter( item => finalArray.findIndex( finalArrayItem => item.key == finalArrayItem.key ) < 0 ) );
		}, [] );
	}
}