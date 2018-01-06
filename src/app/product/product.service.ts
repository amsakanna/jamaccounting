import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { ProductModuleState, ProductState, productActions } from "./product.store";
import { Product, ProductCategory } from "../model";

@Injectable()
export class ProductService extends JamEntityService<Product, ProductModuleState>
{
	public categoryList: ProductCategory[];
	public selectedItemCategory: ProductCategory;
	public form: FormGroup;
	public formItem: Product;
	public emptyItem: Product;
	public featureForms: FormGroup[];

	constructor (
		public store: Store<ProductModuleState>,
		public formBuilder: FormBuilder
	)
	{

		super( 'productState', productActions );

		this.emptyItem = {
			key: null,
			sku: null,
			name: '',
			categoryKey: null,
			brandKey: null,
			color: null,
			pictures: [],
			features: []
		};

		this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );
		this.form = this.formBuilder.group( {
			name: [ '', Validators.required ],
			sku: [ '' ]
		} );
		this.featureForms = [];

		this.subscribeProperties( [ 'list', 'selectedItem', 'loading', 'adding', 'modifying' ] );
		this.store
			.select( 'productState', 'adding' )
			.subscribe( value => console.log( value ) );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( productActions.Initialize() ) );
		this.store.select( state => state.productState.categoryList )
			.subscribe( categoryList => this.categoryList = categoryList );
		this.store.select( state => state.productState.selectedItemCategory )
			.subscribe( selectedItemCategory => this.selectedItemCategory = selectedItemCategory );

		this.store.select( state => state.productState.creating )
			.filter( creating => creating )
			.subscribe( creating =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );
				this.form.setValue( {
					name: this.formItem.name,
					sku: this.formItem.sku
				} );
			} );

		this.store.select( state => state.productState.editing )
			.filter( editing => editing )
			.subscribe( editing =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.selectedItem ) );
				this.form.setValue( {
					name: this.formItem.name,
					sku: this.formItem.sku
				} );
			} );

	}

	public submit (): void
	{
		this.buildFeatureModels()
		const item = buildModelFromForm( this.formItem, this.form );
		super.submit( item );
	}

	private buildFeatureForms (): void
	{
		const defaultFeatures = this.selectedItemCategory.features.map( feature => ( { name: feature.name, value: null } ) );
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