import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from "@angular/router";
import { Store } from '@ngrx/store';
import { InventoryModuleState, InventoryState, InventoryAction } from './inventory.store';
import { InventoryItem } from "../model";

@Component( {
	selector: 'app-inventory-detail',
	templateUrl: './inventory-detail.component.html',
	styleUrls: [ './inventory-detail.component.css' ]
} )
export class InventoryDetailComponent implements OnInit
{

	private item: InventoryItem;
	private path$: Observable<InventoryItem[]>;

	constructor ( private store: Store<InventoryModuleState>,
		private activatedRoute: ActivatedRoute ) { }

	ngOnInit ()
	{

		this.store.select( state => state.inventoryState.selectedItem )
			.subscribe( selectedItem => this.item = selectedItem );

		this.path$ = this.store.select( state => state.inventoryState.selectedItem )
			.withLatestFrom( this.store.select( state => state.inventoryState.tree ) )
			.filter( ( [ selectedItem, tree ] ) => !!tree )
			.map( ( [ selectedItem, tree ] ) => tree.getAncestors( selectedItem ).reverse() );

		/**
		 * Handle first load
		 */
		const inventoryKey: string = this.activatedRoute.snapshot.params[ 'inventory' ] || '';
		this.store.select( state => state.inventoryState.selectedItem ).take( 1 )
			.filter( selectedItem => !selectedItem || selectedItem.key != inventoryKey )
			.subscribe( selectedItem => this.store.dispatch( new InventoryAction.Select( inventoryKey ) ) );

	}

	private edit ()
	{
		this.store.dispatch( new InventoryAction.Edit() );
	}

}
