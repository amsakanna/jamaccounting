import { Data } from "./data.model";

export interface KeyValue<T = string> extends Data
{
	value: T;
}