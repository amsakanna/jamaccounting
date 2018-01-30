import { Component } from "@angular/core";
import { ProductService } from "./voucher-type.service";

@Component( {
	selector: 'app-voucher-type-form',
	templateUrl: './voucher-type-form.component.html',
	styleUrls: [ './voucher-type-form.component.css' ]
} )
export class ProductFormComponent
{
	constructor ( private $: ProductService ) { }
}