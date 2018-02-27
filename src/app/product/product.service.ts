import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { ProductModuleState, ProductState, productActions } from "./product.store";
import { Product, ProductCategory, Brand } from "../model";
import { moduleName } from './product.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class ProductService extends JamEntityService<Product, ProductState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public categoryList: ProductCategory[];
	public brandList: Brand[];
	public featureForms: FormGroup[];

	constructor (
		public rootStore: Store<ProductModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */
		super( rootStore.select( state => state.productState ), productActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( productActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key === 'Product' );
			} );
		this.store.select( 'categoryList' )
			.subscribe( categoryList => this.categoryList = categoryList );
		this.store.select( 'brandList' )
			.subscribe( brandList => this.brandList = brandList );
	}

	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
