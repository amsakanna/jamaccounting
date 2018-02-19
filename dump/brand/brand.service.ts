import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { BrandModuleState, BrandState, brandActions } from "./brand.store";
import { Brand } from "../model";

@Injectable()
export class BrandService extends JamEntityService<Brand, BrandState>
{

	public taxabilities: string[];

	constructor (
		public rootStore: Store<BrandModuleState>,
		public store: Store<BrandState>,
		public formBuilder: FormBuilder
	)
	{
		super( rootStore.select( state => state.brandState ), brandActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'loading', 'adding', 'modifying' );

		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( brandActions.Initialize() ) );
	}

}
