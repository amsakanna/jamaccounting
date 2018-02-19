import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { TaxType } from "../model";

export const taxTypeActions = new JamEntityActions<TaxType>( '[TaxType]' );

export interface TaxTypeAction extends JamEntityAction<TaxType> { }