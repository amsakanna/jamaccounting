import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { InventoryModuleState, InventoryState, InventoryAction } from './inventory.store';
import { InventoryItem } from "../model";

@Component( {
	selector: 'app-inventory-form',
	templateUrl: './inventory-form.component.html',
	styleUrls: [ './inventory-form.component.css' ]
} )
export class InventoryFormComponent implements OnInit
{

	private form: FormGroup;
	private creating: boolean;
	private item: InventoryItem;
	private list: InventoryItem[];

	constructor ( private store: Store<InventoryModuleState>,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder )
	{
		this.item = new InventoryItem();
		this.creating = false;
	}

	ngOnInit ()
	{

		this.store.select( state => state.inventoryState )
			.subscribe( state =>
			{
				if ( state.loading ) return;

				this.list = state.list;
				this.creating = state.creating;

				if ( state.creating ) {
					this.item.product.categoryKey = ( state.selectedItem || this.item ).key;
				} else if ( state.editing ) {
					this.item = state.selectedItem || this.item;
				}

			} );

		/**
		 * Handle first load
		 */
		const inventoryKey: string = this.activatedRoute.snapshot.params[ 'inventory' ] || null;
		this.store.select( state => state.inventoryState.selectedItem ).take( 1 )
			.filter( selectedItem => !selectedItem || ( inventoryKey && selectedItem.key != inventoryKey ) )
			.subscribe( selectedItem => this.store.dispatch( new InventoryAction.Select( inventoryKey ) ) );

		this.store.select( state => state.inventoryState.creating ).take( 1 )
			.withLatestFrom( this.store.select( state => state.inventoryState.editing ) )
			.filter( ( [ creating, editing ] ) => !creating && !editing )
			.subscribe( ( [ creating, editing ] ) => inventoryKey
				? this.store.dispatch( new InventoryAction.Edit( new InventoryItem( { key: inventoryKey } ) ) )
				: this.store.dispatch( new InventoryAction.Create() ) );

		this.form = this.buildForm();
	}

	private buildForm (): FormGroup
	{
		return this.formBuilder.group( {
			units: [ this.item.units, Validators.required ]
		} );
	}

	private buildModel (): InventoryItem
	{
		this.item.units = this.form.controls[ 'units' ].value;
		return this.item;
	}

	private submit (): void
	{
		const inventoryItem = this.buildModel();
		if ( this.creating ) {
			this.store.dispatch( new InventoryAction.Add( inventoryItem ) );
		} else {
			this.store.dispatch( new InventoryAction.Modify( inventoryItem ) );
		}
	}

	private cancel (): void
	{
		this.store.dispatch( new InventoryAction.CancelCreate() );
		this.store.dispatch( new InventoryAction.CancelEdit() );
	}

	private reset (): void
	{

	}

}
