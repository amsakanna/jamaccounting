import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Tax, TaxType } from "../model";
import { actionPrefix, additionalStates } from "./tax.config";

export interface TaxModuleState extends CompanyModuleState
{
	taxState: TaxState
}

export interface TaxState extends JamEntityState<Tax>
{
	taxTypeList: TaxType[];
	selectedItemType: TaxType;
}

class TaxAdapter extends JamEntityAdapter<Tax, TaxState>
{
	public select ( state: TaxState, key: string ): TaxState
	{
		const newState = super.select( state, key );
		const selectedItemType = state.taxTypeList.find( item => item.key == newState.selectedItem.typeKey );
		return this.newState( newState, { selectedItemType } );
	}
}

export const taxActions = new JamEntityActions<Tax>( actionPrefix );
export const taxAdapter = new TaxAdapter( taxActions, additionalStates );
export const taxReducer = taxAdapter.reducer;
