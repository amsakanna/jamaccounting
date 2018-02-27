import { Component } from "@angular/core";
import { PartyService } from "./party.service";

@Component( {
	selector: 'app-party',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-party-detail></app-party-detail>
		</app-explorer>
	`
} )
export class PartyComponent
{
	constructor ( private $: PartyService ) { }
}
