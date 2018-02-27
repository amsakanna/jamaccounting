import { Component } from "@angular/core";
import { InventoryService } from "./inventory.service";

@Component( {
	selector: 'app-inventory',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-inventory-detail></app-inventory-detail>
		</app-explorer>
	`
} )
export class InventoryComponent
{
	constructor ( private $: InventoryService ) { }
}
