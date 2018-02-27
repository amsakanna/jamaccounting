import { Data } from "../../jam/model-library";

export interface JournalLine extends Data
{
	accountKey: string;
	amount: number;
	narration: string;
}
