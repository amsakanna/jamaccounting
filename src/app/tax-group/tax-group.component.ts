import { Component } from "@angular/core";
import { TaxGroupService } from "./tax-group.service";

@Component( {
	selector: 'app-tax-group',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-tax-group-detail></app-tax-group-detail>
		</app-explorer>
	`
} )
export class TaxGroupComponent
{
	constructor ( private $: TaxGroupService ) { }
}
