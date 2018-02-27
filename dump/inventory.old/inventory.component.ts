import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { InventoryModuleState, InventoryAction } from './inventory.store';
import { InventoryItem } from "../model";
import { FlatTree } from '../../jam/model-library';

@Component( {
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: [ './inventory.component.css' ]
} )
export class InventoryComponent implements OnInit
{

	private loading: boolean;
	private tree: FlatTree<InventoryItem>;
	private selectedItem: InventoryItem;

	constructor ( private store: Store<InventoryModuleState> ) { }

	ngOnInit ()
	{
		this.store.select( state => state.inventoryState.loading )
			.subscribe( loading => this.loading = loading );

		this.store.select( state => state.inventoryState.tree )
			.subscribe( tree => this.tree = tree );

		this.store.select( state => state.inventoryState.selectedItem )
			.subscribe( selectedItem => this.selectedItem = selectedItem );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( new InventoryAction.Initialize() ) );
	}

	private select ( inventoryItem: InventoryItem )
	{
		this.store.dispatch( new InventoryAction.Select( inventoryItem.key ) );
	}

	private create ()
	{
		this.store.dispatch( new InventoryAction.Create() );
	}

}
