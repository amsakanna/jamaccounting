import { Data } from "./data.model";

export interface Picture extends Data
{
	name: string,
	normal: string,
	thumbnail: string,
	big: string,
	maxResolution: string
}
