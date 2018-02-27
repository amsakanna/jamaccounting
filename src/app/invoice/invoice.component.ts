import { Component } from "@angular/core";
import { InvoiceService } from "./invoice.service";

@Component( {
	selector: 'app-invoice',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-invoice-detail></app-invoice-detail>
		</app-explorer>
	`
} )
export class InvoiceComponent
{
	constructor ( private $: InvoiceService ) { }
}
