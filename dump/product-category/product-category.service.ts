import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TreeNode } from 'primeng/primeng';
import { Store } from "@ngrx/store";
import { ProductCategoryModuleState, ProductCategoryAction } from "./product-category.store";
import { ProductCategory } from "../model";
import { buildModelFromForm } from "../../jam/functions";

@Injectable()
export class ProductCategoryService
{
	public list: ProductCategory[];
	public tree: TreeNode[];
	public selectedNode: TreeNode;
	public selectedItem: ProductCategory;
	public selectedItemParent: ProductCategory;
	public loading: boolean;
	public creating: boolean;
	public adding: boolean;
	public modifying: boolean;
	public form: FormGroup;
	public formItem: ProductCategory;
	public emptyItem: ProductCategory;
	public featureForms: FormGroup[];

	constructor (
		public store: Store<ProductCategoryModuleState>,
		public formBuilder: FormBuilder
	)
	{

		this.emptyItem = {
			key: null,
			name: '',
			id: null,
			parentKey: null,
			picture: null,
			features: []
		};

		this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );

		this.form = this.formBuilder.group( {
			name: [ '', Validators.required ],
			id: [ '' ]
		} );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( new ProductCategoryAction.Initialize() ) );

		this.store.select( state => state.productCategoryState.list )
			.map( list => this.list = list )
			.map( list =>
			{
				var tree = {};
				list.forEach( item => tree[ item.key ] = {
					label: item.name,
					data: item, parentKey: item.parentKey,
					icon: "fa-sitemap"
				} );
				return tree;
			} )
			.map( tree =>
			{
				var finalTree: TreeNode[] = [];
				for ( var key in tree ) {
					const node = tree[ key ];
					if ( node.parentKey ) {
						const parentNode = tree[ node.parentKey ];
						parentNode.children = parentNode.children ? [ ...parentNode.children, node ] : [ node ];
					} else {
						finalTree.push( node );
					}
				}
				console.log( finalTree );
				return finalTree;
			} )
			.subscribe( tree => this.tree = tree );

		this.store.select( state => state.productCategoryState.selectedItem )
			.subscribe( selectedItem =>
			{
				this.selectedItem = selectedItem;
				this.selectedItemParent = this.list.find( item => item.key == selectedItem.key );
			} );

		this.store.select( state => state.productCategoryState.loading )
			.subscribe( loading => this.loading = loading );

		this.store.select( state => state.productCategoryState.creating )
			.map( creating => this.creating = creating )
			.filter( creating => creating )
			.subscribe( creating =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );
				this.featureForms = [];
				this.form.reset();
			} );

		this.store.select( state => state.productCategoryState.adding )
			.subscribe( adding => this.adding = adding );

		this.store.select( state => state.productCategoryState.editing )
			.filter( editing => editing )
			.subscribe( editing =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.selectedItem ) );
				this.form.setValue( {
					name: this.formItem.name,
					id: this.formItem.id
				} );
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

		this.store.select( state => state.productCategoryState.modifying )
			.subscribe( modifying => this.modifying = modifying );

	}

	public checkAndSelect ( key: string )
	{
		if ( !this.selectedItem || this.selectedItem.key != key ) {
			this.store.dispatch( new ProductCategoryAction.Select( key ) );
		}
	}

	public select ( item: ProductCategory )
	{
		this.store.dispatch( new ProductCategoryAction.Select( item.key ) );
	}

	public create (): void
	{
		this.store.dispatch( new ProductCategoryAction.Create() );
	}

	public edit (): void
	{
		this.store.dispatch( new ProductCategoryAction.Edit() );
	}

	public remove ( key: string ): void
	{
		this.store.dispatch( new ProductCategoryAction.Remove( key ) );
	}

	public submit (): void
	{
		const item = buildModelFromForm( this.formItem, this.form );

		this.creating
			? this.store.dispatch( new ProductCategoryAction.Add( item ) )
			: this.store.dispatch( new ProductCategoryAction.Modify( item ) );
	}

	public cancel (): void
	{
		this.creating
			? this.store.dispatch( new ProductCategoryAction.CancelCreate() )
			: this.store.dispatch( new ProductCategoryAction.CancelEdit() );
	}

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

}