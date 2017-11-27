export class JamEntityActionTypes
{

	public initialize: string;
	public initialized: string;
	public select: string;
	public selected: string;
	public create: string;
	public cancelCreate: string;
	public add: string;
	public added: string;
	public edit: string;
	public cancelEdit: string;

	constructor ( entityName: string, prefix: string = '[', suffix: string = ']' )
	{
		const tag = entityName ? prefix + entityName + suffix : '';

		for ( var property in this ) {
			if ( this.hasOwnProperty( property ) ) {
				this[ property ] = tag + '\t' + property;
			}
		}

	}

}