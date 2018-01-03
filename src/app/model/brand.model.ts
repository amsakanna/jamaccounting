import { Data } from "../../jam/model-library";

export class Brand implements Data
{

	constructor (
		public key: string,
		public id: string,
		public name: string,
		public logo: string = null
	) { }

	public toObject ()
	{
		return {
			key: this.key,
			id: this.id,
			name: this.name,
			logo: this.logo
		}
	}

}
