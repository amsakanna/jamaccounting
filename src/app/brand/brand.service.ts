import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { BrandModuleState, BrandState, brandActions } from "./brand.store";
import { Brand } from "../model";

@Injectable()
export class BrandService extends JamEntityService<Brand, BrandModuleState>
{

	public taxabilities: string[];

	constructor (
		public store: Store<BrandModuleState>,
		public formBuilder: FormBuilder
	)
	{
		super( 'brandState', brandActions );
		this.subscribeProperties( [ 'list', 'form', 'selectedItem', 'formItem', 'loading', 'adding', 'modifying' ] );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( brandActions.Initialize() ) );
	}

}