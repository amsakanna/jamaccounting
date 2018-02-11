import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product',
	template: `
		<app-explorer [$]="$">
			<app-product-detail></app-product-detail>
		</app-explorer>
	`
} )
export class ProductComponent
{
	constructor ( private $: ProductService )
	{
		console.log( 'ProductComponent' );
	}
}
