import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { BrandModuleState, BrandState, brandActions } from "./brand.store";
import { Brand } from "../model";
import { moduleName } from './brand.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class BrandService extends JamEntityService<Brand, BrandState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;

	constructor (
		public rootStore: Store<BrandModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */

		super( rootStore.select( state => state.brandState ), brandActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */

		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( brandActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key == 'Brand' );
			} );

	}

	/**
	 * Overrides
	 */

	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
