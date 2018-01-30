import { Component } from "@angular/core";
import { ProductCategoryService } from "./product-category.service";

@Component( {
	selector: 'app-product-category',
	template: `
		<app-explorer [$]="$">
			<router-outlet></router-outlet>
		</app-explorer>
	`
} )
export class ProductCategoryComponent
{
	constructor ( private $: ProductCategoryService ) { }
}
