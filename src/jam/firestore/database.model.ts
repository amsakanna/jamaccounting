import { Data } from "../../jam/model-library";
import { Table } from "./table.model";

export interface Database extends Data
{
	name: string;
	path: string;
	metadataPath: string;
	tables: Table<Data>[];
}