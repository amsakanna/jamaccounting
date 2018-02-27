import { Component } from "@angular/core";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory-form',
	templateUrl: './inventory-form.component.html',
	styleUrls: [ './inventory-form.component.css' ]
} )
export class InventoryFormComponent
{
	constructor ( private $: InventoryService ) { }
}