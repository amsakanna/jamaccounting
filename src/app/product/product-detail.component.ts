import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.css' ]
} )
export class ProductDetailComponent
{
	constructor ( private $: ProductService ) { }
}
