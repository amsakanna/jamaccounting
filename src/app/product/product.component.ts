import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-product-detail></app-product-detail>
		</app-explorer>
	`
} )
export class ProductComponent
{
	constructor ( private $: ProductService ) { }
}
