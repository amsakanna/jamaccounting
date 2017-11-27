import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FlatTree } from '../../jam-model-library/jam-model-library';
import { InventoryItem } from "./inventory-item.model";

@Injectable()
export class InventoryService
{

	public tree: FlatTree<InventoryItem>;

	constructor ( private router: Router )
	{
		var inventoryItems = this.getInventoryItemList();
		this.tree = new FlatTree<InventoryItem>( inventoryItems, 'IN00' );
		this.tree.defaultItem = this.tree.getItem( 'IN00C' );
		this.tree.select( this.tree.defaultItem );
	}

	private getInventoryItemList (): Array<InventoryItem>
	{
		return [
			new InventoryItem( { $key: 'IN00', id: 'IN00', name: 'Primary' } ),

			new InventoryItem( { $key: 'IN00C', id: 'IN00C', name: 'Clothes', units: 540, parentKey: 'IN00', unitOfMeasure: 'No' } ),
			new InventoryItem( { $key: 'IN00C1', id: 'IN00C1', name: 'Sarees', units: 40, buyingPrice: 400, parentKey: 'IN00C' } ),
			new InventoryItem( { $key: 'IN00C2', id: 'IN00C2', name: 'Gowns', units: 500, buyingPrice: 1200, sellingPrice: 500, parentKey: 'IN00C' } )
		];
	}

	public upsert ( item: InventoryItem )
	{
		var existingItem = this.tree.getItem( existingItem );
		if ( existingItem ) {
			const index = this.tree.list.indexOf( existingItem );
			this.tree.list.splice( index, 1 );
		}
		this.tree.list.push( item );
	}

}
