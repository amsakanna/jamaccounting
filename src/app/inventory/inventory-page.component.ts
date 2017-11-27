import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InventoryService } from "./inventory.service";
import { FlatTree } from '../../jam-model-library/jam-model-library';
import { InventoryItem } from "./inventory-item.model";

@Component( {
	selector: 'app-inventory-page',
	templateUrl: './inventory-page.component.html',
	styleUrls: [ './inventory-page.component.css' ]
} )
export class InventoryPageComponent implements OnInit
{

	private inventoryTree: FlatTree<InventoryItem>;
	private selectedItem: InventoryItem;
	private path: Array<InventoryItem>;

	constructor ( private router: Router,
		private inventoryService: InventoryService )
	{
		this.inventoryTree = this.inventoryService.tree;
		this.selectedItem = this.inventoryService.tree.selectedItem;
		this.path = this.inventoryService.tree.getPath( this.inventoryTree.selectedItem ).reverse();
	}

	ngOnInit () { }

	private select ( inventoryItem: InventoryItem )
	{
		this.inventoryService.tree.select( inventoryItem );
		this.selectedItem = this.inventoryService.tree.selectedItem;
		this.path = this.inventoryService.tree.getPath( this.inventoryTree.selectedItem ).reverse();
		this.router.navigateByUrl( '/inventory/' + this.inventoryService.tree.selectedItem.$key );
	}

	private newInventoryItem ()
	{
		this.router.navigateByUrl( '/inventory/new/edit' );
	}

}
