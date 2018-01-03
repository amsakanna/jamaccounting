import { Error } from "./error.model";
import { Statuses } from "./statuses.enum";

export class Operation
{
	constructor (
		public name: string,
		public category: string,
		public initialized: boolean = false,
		public processing: boolean = false,
		public status: Statuses = Statuses.None,
		public error: Error = new Error()
	) { }
}