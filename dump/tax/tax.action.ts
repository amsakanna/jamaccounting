import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { Tax, TaxType } from "../model";

export const taxActions = new JamEntityActions<Tax>( '[Tax]' );

export interface TaxAction extends JamEntityAction<Tax>
{
	taxTypeList: TaxType[];
	selectedItemType: TaxType;
}