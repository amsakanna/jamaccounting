import { Component } from "@angular/core";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory-detail',
	templateUrl: './inventory-detail.component.html',
	styleUrls: [ './inventory-detail.component.css' ]
} )
export class InventoryDetailComponent
{
	constructor ( private $: InventoryService ) { }
}
