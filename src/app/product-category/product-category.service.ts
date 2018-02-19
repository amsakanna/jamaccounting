import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { ProductCategoryModuleState, ProductCategoryState, productCategoryActions } from "./product-category.store";
import { ProductCategory } from "../model";
import { moduleName } from './product-category.config';
import { CoreAction } from "../core";
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class ProductCategoryService extends JamEntityService<ProductCategory, ProductCategoryState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public featureForms: FormGroup[];

	constructor (
		public rootStore: Store<ProductCategoryModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */

		super( rootStore.select( state => state.productCategoryState ), productCategoryActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */

		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( productCategoryActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key == 'Product Category' );
				console.log( this.selectedMasterName );
			} );

		this.store.select( 'creating' )
			.filter( creating => creating )
			.subscribe( creating => this.featureForms = [] );

		this.store.select( 'editing' )
			.filter( editing => editing )
			.subscribe( editing =>
			{
				this.featureForms = [];
				this.formItem.features = this.formItem.features || [];
				this.formItem.features.forEach( feature =>
				{
					this.featureForms.push( this.formBuilder.group( {
						name: [ feature.name, Validators.required ],
						unitOfMeasure: [ feature.unitOfMeasure ],
						newFeatureOption: [ '' ]
					} ) );
				} );
			} );

		/**
		 * Store Dispatch
		 */

	}

	/**
	 * Overrides
	 */

	public createFeature (): void
	{
		this.featureForms.push(
			this.formBuilder.group( {
				name: [ '', Validators.required ],
				unitOfMeasure: [ '' ],
				newFeatureOption: [ '' ]
			} )
		)
		this.formItem.features.push( { name: '', options: [], unitOfMeasure: '' } )
	}

	public addFeatureOption ( i: number ): void
	{
		const newFeatureOption = this.featureForms[ i ].controls[ 'newFeatureOption' ].value;
		this.formItem.features[ i ].options.push( newFeatureOption );
	}

	public addFeature ( i: number ): void
	{
		this.formItem.features[ i ] = buildModelFromForm( this.formItem.features[ i ], this.featureForms[ i ] );
	}

	public removeFeature ( i: number ): void
	{
		this.formItem.features.splice( i, 1 );
		console.log( 'remove-feature' );
		console.log( '----------', Object.is( this.formItem, this.selectedItem ) );
		console.log( 'selected-item', this.selectedItem );
		console.log( 'form-item', this.formItem );
	}

	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
