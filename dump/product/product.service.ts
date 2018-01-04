import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { ProductModuleState, ProductState, ProductAction } from "./product.store";
import { Product, ProductCategory } from "../model";
import { Observabled } from "../../jam/model-library";
import { Observable } from "rxjs";

@Injectable()
export class ProductService implements Observabled<ProductState>
{
	categoryList: Observable<ProductCategory[]>;
	selectedItemCategory: ProductCategory;
	initialized: boolean;
	list: Product[];
	loading: boolean;
	creating: boolean;
	editing: boolean;
	adding: boolean;
	modifying: boolean;
	removing: boolean;
	defaultItem: Product;
	selectedItem: Product;
	itemBeingSelectedKey: string;
	itemBeingCreated: Product;
	itemBeingEdited: Product;
	itemBeingAdded: Product;
	itemBeingModified: Product;
	itemBeingRemovedKey: string;
	itemBeingRemovedIndex: number;
	lastAddedItem: Product;
	lastModifiedItem: Product;
	lastRemovedItem: Product;
	lastRemovedItemIndex: number;

	public form: FormGroup;
	public formItem: Product;
	public emptyItem: Product;
	public featureForms: FormGroup[];

	constructor (
		public store: Store<ProductModuleState>,
		public formBuilder: FormBuilder
	)
	{

		this.emptyItem = {
			key: null,
			sku: null,
			name: '',
			categoryKey: null,
			brandKey: null,
			color: null,
			pictures: null,
			features: null
		};

		this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );

		this.form = this.formBuilder.group( {
			name: [ '', Validators.required ],
			sku: [ '' ]
		} );

		this.storeSelect( 'list' );
		this.storeSelect( 'selectedItem' );
		this.storeSelect( 'loading' );
		this.storeSelect( 'adding' );
		this.storeSelect( 'modifying' );
		this.storeSelect( 'creating', ( creating ) =>
		{
			if ( !creating ) return;
			this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );
			this.featureForms = [];
			if ( this.selectedItemCategory.features )
				this.formItem.features = this.selectedItemCategory.features
					.map( feature => ( { name: feature.name, value: null } ) );
			this.formItem.features = this.formItem.features || [];
			this.formItem.features.forEach( feature =>
			{
				this.featureForms.push( this.formBuilder.group( {
					value: [ feature.value ]
				} ) );
			} );
			this.form.reset();
		} );
		this.storeSelect( 'editing', ( editing ) =>
		{
			if ( !editing ) return;
			this.formItem = JSON.parse( JSON.stringify( this.selectedItem ) );
			this.form.setValue( {
				name: this.formItem.name,
				sku: this.formItem.sku
			} );
			this.featureForms = [];
			const defaultFeatures = this.selectedItemCategory.features.map( feature => ( { name: feature.name, value: null } ) );
			this.formItem.features = concatUniqueKeys( 'name', defaultFeatures, this.formItem.features );
			this.formItem.features = this.formItem.features || [];
			this.formItem.features.forEach( feature =>
			{
				this.featureForms.push( this.formBuilder.group( {
					value: [ feature.value ]
				} ) );
			} );
		} );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( new ProductAction.Initialize() ) );

		this.store.select( state => state.productState.categoryList )
			.subscribe( categoryList => this.categoryList = categoryList );

		this.store.select( state => state.productState.selectedItemCategory )
			.subscribe( selectedItemCategory => this.selectedItemCategory = selectedItemCategory );

	}

	private storeSelect ( key: keyof ProductState, onSubscribe?: ( value: any ) => void ): void
	{
		this.store.select( 'productState', key )
			.map( value => this[ key as string ] = value )
			.subscribe( onSubscribe );
	}

	public fn ( actionName: string )
	{
		this.store.dispatch( new ProductAction[ actionName ]() );
	}

	public checkAndSelect ( key: string ): void
	{
		if ( !this.selectedItem || this.selectedItem.key != key ) {
			this.store.dispatch( new ProductAction.Select( key ) )
		}
	}

	public select ( item: Product ): void
	{
		this.store.dispatch( new ProductAction[ 'Select' ]( item.key ) );
	}

	public create (): void
	{
		this.store.dispatch( new ProductAction.Create() );
	}

	public edit (): void
	{
		this.store.dispatch( new ProductAction.Edit() );
	}

	public remove ( key: string ): void
	{
		this.store.dispatch( new ProductAction.Remove( key ) );
	}

	public submit (): void
	{
		for ( let i = 0; i < this.formItem.features.length; i++ ) {
			if ( this.featureForms[ i ].controls[ 'value' ].value ) {
				this.formItem.features[ i ].value = this.featureForms[ i ].controls[ 'value' ].value;
			}
		}
		const item = buildModelFromForm( this.formItem, this.form );

		this.creating
			? this.store.dispatch( new ProductAction.Add( item ) )
			: this.store.dispatch( new ProductAction.Modify( item ) );
	}

	public cancel (): void
	{
		this.creating
			? this.store.dispatch( new ProductAction.CancelCreate() )
			: this.store.dispatch( new ProductAction.CancelEdit() );
	}

}