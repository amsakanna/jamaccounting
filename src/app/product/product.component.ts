import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product',
	template: `
		<app-explorer [$]="$">
			<router-outlet></router-outlet>
		</app-explorer>
	`
} )
export class ProductComponent
{
	constructor ( private $: ProductService ) { }
}
