import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { Tax } from "../model";

export const taxActions = new JamEntityActions<Tax>( '[Tax]' );

export interface TaxAction extends JamEntityAction<Tax> { }