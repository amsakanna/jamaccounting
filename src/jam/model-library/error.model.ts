export class Error
{
	constructor (
		public code: string = '',
		public category: string = '',
		public subCategory: string = '',
		public message: string = '',
		public detail: string = '',
		public reason: string = '',
		public solution: string = ''
	) { }

	public get id (): string
	{
		return ( this.category || '' )
			+ '-' + ( this.subCategory || '' )
			+ '-' + ( this.code || '' );
	}
}