import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { Brand } from "../model";

export const brandActions = new JamEntityActions<Brand>( '[Brand]' );

export interface BrandAction extends JamEntityAction<Brand> { }