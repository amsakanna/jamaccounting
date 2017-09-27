import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from "../services/inventory.service";
import { InventoryItem } from "../models/inventory-item.model";
import { SupplyType } from "../app.enum";

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit
{

	private inventoryItem: InventoryItem;
	private path: Array<InventoryItem>;
	private pathText: string;

	ngOnInit()
	{
	}

	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private inventoryService: InventoryService)
	{
		this.inventoryItem = this.inventoryService.tree.selectedItem;
		var routeKey = this.activatedRoute.snapshot.params['key'] || '';
		if( routeKey != this.inventoryService.tree.selectedItem.$key )
		{
			this.inventoryService.tree.select( routeKey );
			this.router.navigateByUrl( '/inventory/' + this.inventoryService.tree.selectedItem.$key );
		}
	}
	
	ngDoCheck()
	{
		this.inventoryItem = this.inventoryService.tree.selectedItem;
		this.path = this.inventoryService.tree.getPath( this.inventoryItem ).reverse();
	}

}
