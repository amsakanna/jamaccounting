import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory-detail',
	templateUrl: './inventory-detail.component.html',
	styleUrls: [ './inventory-detail.component.css' ]
} )
export class InventoryDetailComponent
{
	constructor ( private $: InventoryService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ 'inventory' ] || '';
		this.$.checkAndSelect( key );
	}
}