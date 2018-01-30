import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { ProductModuleState, ProductState, productActions } from "./voucher-type.store";
import { Product, ProductCategory, Brand } from "../model";

@Injectable()
export class ProductService extends JamEntityService<Product, ProductModuleState>
{
	public categoryList: ProductCategory[];
	public selectedItemCategory: ProductCategory;
	public featureForms: FormGroup[];
	public brandList: Brand[];
	public selectedItemBrand: Brand;

	constructor (
		public store: Store<ProductModuleState>,
		public formBuilder: FormBuilder
	)
	{
		super( 'productState', productActions );
		this.subscribeProperties( [ 'list', 'form', 'selectedItem', 'formItem', 'loading', 'editing', 'adding', 'modifying' ] );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( productActions.Initialize() ) );
		this.store.select( state => state.productState.categoryList )
			.subscribe( categoryList => this.categoryList = categoryList );
		this.store.select( state => state.productState.selectedItemCategory )
			.subscribe( selectedItemCategory => this.selectedItemCategory = selectedItemCategory );
		this.store.select( state => state.productState.brandList )
			.subscribe( brandList => this.brandList = brandList );
		this.store.select( state => state.productState.selectedItemBrand )
			.subscribe( selectedItemBrand => this.selectedItemBrand = selectedItemBrand );
		this.store.select( state => state.productState.creating )
			.filter( creating => creating )
			.subscribe( creating => this.buildFeatureForms() );
		this.store.select( state => state.productState.editing )
			.filter( editing => editing )
			.subscribe( editing => this.buildFeatureForms() );
	}

	public submit (): void
	{
		this.buildFeatureModels()
		super.submit();
	}

	private buildFeatureForms (): void
	{
		this.featureForms = [];
		const defaultFeatures = this.selectedItemCategory
			? this.selectedItemCategory.features.map( feature => ( { name: feature.name, value: null } ) )
			: [];
		this.formItem.features = concatUniqueKeys( 'name', defaultFeatures, this.formItem.features );
		this.formItem.features.forEach( feature =>
		{
			this.featureForms.push( this.formBuilder.group( {
				value: [ feature.value ]
			} ) );
		} );
	}

	private buildFeatureModels (): void
	{
		for ( let i = 0; i < this.formItem.features.length; i++ ) {
			if ( this.featureForms[ i ].controls[ 'value' ].value ) {
				this.formItem.features[ i ].value = this.featureForms[ i ].controls[ 'value' ].value;
			}
		}
	}

}