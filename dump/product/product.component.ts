import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: [ './product.component.css' ]
} )
export class ProductComponent
{
	constructor ( private $: ProductService ) { }
}