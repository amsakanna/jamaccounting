import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { ProductModuleState, ProductState, productActions } from "./product.store";
import { Product, ProductCategory, Brand } from "../model";
import { module } from './product.config';
import { CoreAction } from "../core";

@Injectable()
export class ProductService extends JamEntityService<Product, ProductState>
{
	public get moduleName (): string { return module.name }
	public categoryList: ProductCategory[];
	public brandList: Brand[];
	public selectedItemCategory: ProductCategory;
	public selectedItemBrand: Brand;
	public featureForms: FormGroup[];

	constructor (
		public rootStore: Store<ProductModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/*  Initialize service  */
		super( rootStore.select( state => state.productState ), productActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/*  Select from store  */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( productActions.Initialize() ) );
		this.store.select( state => state.categoryList )
			.subscribe( categoryList => this.categoryList = categoryList );
		this.store.select( state => state.brandList )
			.subscribe( brandList => this.brandList = brandList );
		this.store.select( state => state.selectedItemCategory )
			.subscribe( selectedItemCategory => this.selectedItemCategory = selectedItemCategory );
		this.store.select( state => state.selectedItemBrand )
			.subscribe( selectedItemBrand => this.selectedItemBrand = selectedItemBrand );
		this.store.select( state => state.creating )
			.filter( creating => creating )
			.subscribe( creating => this.buildFeatureForms() );
		this.store.select( state => state.editing )
			.filter( editing => editing )
			.subscribe( editing => this.buildFeatureForms() );

		/*  Dispatch Actions  */
		console.log( 'ProductService' );
		this.store.dispatch( new CoreAction.AddModule( module ) );

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
		this.formItem.features
			.forEach( feature => this.featureForms
				.push( this.formBuilder.group( { value: [ feature.value ] } ) ) );
	}

	private buildFeatureModels (): void
	{
		for ( let i = 0; i < this.formItem.features.length; i++ ) {
			const formValue: string = this.featureForms[ i ].controls[ 'value' ].value;
			if ( formValue && !this.selectedItemCategory.features[ i ].options )
				this.formItem.features[ i ].value = formValue;
		}
	}

}
