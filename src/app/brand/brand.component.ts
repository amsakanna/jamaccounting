import { Component } from "@angular/core";
import { BrandService } from "./brand.service";

@Component( {
	selector: 'app-brand',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-brand-detail></app-brand-detail>
		</app-explorer>
	`
} )
export class BrandComponent
{
	constructor ( private $: BrandService ) { }
}
