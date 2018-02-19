import { Component } from "@angular/core";
import { TaxService } from "./tax.service";

@Component( {
	selector: 'app-tax',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-tax-detail></app-tax-detail>
		</app-explorer>
	`
} )
export class TaxComponent
{
	constructor ( private $: TaxService ) { }
}
