import { Statuses } from "./statuses.enum";

export class Status
{
	constructor (
		public name: Statuses = Statuses.None,
		public initialized: boolean = false,
		public processing: boolean = false
	) { }
}