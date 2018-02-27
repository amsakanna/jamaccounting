import { Data } from "../../jam/model-library";
import { JournalLine } from "./journal-line.model";

export interface Journal extends Data
{
	transactionDate: string;
	debitJournalLines: JournalLine[];
	creditJournalLines: JournalLine[];
	amount: number;
	referenceNumber?: string;
	narration?: string;
}
