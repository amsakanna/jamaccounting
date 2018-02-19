import { Component } from "@angular/core";
import { TaxTypeService } from "./tax-type.service";

@Component( {
	selector: 'app-tax-type',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-tax-type-detail></app-tax-type-detail>
		</app-explorer>
	`
} )
export class TaxTypeComponent
{
	constructor ( private $: TaxTypeService ) { }
}
