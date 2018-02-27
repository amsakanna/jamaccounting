import { Component } from "@angular/core";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: [ './inventory.component.css' ]
} )
export class InventoryComponent
{
	constructor ( private $: InventoryService ) { }
}