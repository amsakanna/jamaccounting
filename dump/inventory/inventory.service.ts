import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { InventoryModuleState, InventoryAction } from "./inventory.store";
import { Inventory, Product, ProductCategory, Tax } from "../model";

@Injectable()
export class InventoryService
{
	public list: Inventory[];
	public selectedItem: Inventory;
	public selectedItemProduct: Product;
	public selectedItemCategory: ProductCategory;
	public taxList: Tax[];
	public loading: boolean;
	public creating: boolean;
	public adding: boolean;
	public modifying: boolean;
	public form: FormGroup;
	public formItem: Inventory;
	public emptyItem: Inventory;

	constructor (
		public store: Store<InventoryModuleState>,
		public formBuilder: FormBuilder
	)
	{

		this.emptyItem = {
			key: null,
			productKey: null,
			supplyType: null,
			units: null,
			buyingPrice: null,
			sellingPrice: null,
			taxKeys: []
		};

		this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );

		this.form = this.formBuilder.group( {
			units: [ 0, Validators.required ],
			buyingPrice: [ '' ],
			sellingPrice: [ '' ]
		} );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( new InventoryAction.Initialize() ) );

		this.store.select( state => state.inventoryState.list )
			.subscribe( list => this.list = list );

		this.store.select( state => state.inventoryState.selectedItem )
			.subscribe( selectedItem => this.selectedItem = selectedItem );

		this.store.select( state => state.inventoryState.selectedItemProduct )
			.subscribe( selectedItemProduct => this.selectedItemProduct = selectedItemProduct );

		this.store.select( state => state.inventoryState.selectedItemCategory )
			.subscribe( selectedItemCategory => this.selectedItemCategory = selectedItemCategory );

		this.store.select( state => state.inventoryState.taxList )
			.subscribe( taxList => this.taxList = taxList );

		this.store.select( state => state.inventoryState.loading )
			.subscribe( loading => this.loading = loading );

		this.store.select( state => state.inventoryState.creating )
			.map( creating => this.creating = creating )
			.filter( creating => creating )
			.subscribe( creating =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.emptyItem ) );
				this.form.reset();
			} );

		this.store.select( state => state.inventoryState.adding )
			.subscribe( adding => this.adding = adding );

		this.store.select( state => state.inventoryState.editing )
			.filter( editing => editing )
			.subscribe( editing =>
			{
				this.formItem = JSON.parse( JSON.stringify( this.selectedItem ) );
				this.form.setValue( {
					units: this.formItem.units,
					buyingPrice: this.formItem.buyingPrice,
					sellingPrice: this.formItem.sellingPrice
				} );
			} );

		this.store.select( state => state.inventoryState.modifying )
			.subscribe( modifying => this.modifying = modifying );

	}

	public checkAndSelect ( key: string )
	{
		if ( !this.selectedItem || this.selectedItem.key != key ) {
			this.store.dispatch( new InventoryAction.Select( key ) )
		}
	}

	public select ( item: Inventory )
	{
		this.store.dispatch( new InventoryAction.Select( item.key ) );
	}

	public create (): void
	{
		this.store.dispatch( new InventoryAction.Create() );
	}

	public edit (): void
	{
		this.store.dispatch( new InventoryAction.Edit() );
	}

	public remove ( key: string ): void
	{
		this.store.dispatch( new InventoryAction.Remove( key ) );
	}

	public submit (): void
	{
		const item = buildModelFromForm( this.formItem, this.form );

		this.creating
			? this.store.dispatch( new InventoryAction.Add( item ) )
			: this.store.dispatch( new InventoryAction.Modify( item ) );
	}

	public cancel (): void
	{
		this.creating
			? this.store.dispatch( new InventoryAction.CancelCreate() )
			: this.store.dispatch( new InventoryAction.CancelEdit() );
	}

}