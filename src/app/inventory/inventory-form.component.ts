import { Component } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory-form',
	templateUrl: './inventory-form.component.html',
	styleUrls: [ './inventory-form.component.css' ]
} )
export class InventoryFormComponent
{
	constructor ( private $: InventoryService ) { }

	public taxGroupSelectionChange ()
	{
		this.$.formItem.taxGroupKey = this.$.formItem.taxGroup.key;
	}

}
