import { Component } from "@angular/core";
import { ProductCategoryService } from "./product-category.service";

@Component( {
	selector: 'app-product-category',
	template: `
		<app-explorer
			[$]="$"
			[tabs]="$.masterNames"
			(tabChange)="$.tabChange( $event )"
			[selectedTab]="$.selectedMasterName">
			<app-product-category-detail></app-product-category-detail>
		</app-explorer>
	`
} )
export class ProductCategoryComponent
{
	constructor ( private $: ProductCategoryService ) { }
}
