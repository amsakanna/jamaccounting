import { Component } from "@angular/core";
import { ProductService } from "./voucher-type.service";

@Component( {
	selector: 'app-voucher-type',
	templateUrl: './voucher-type.component.html',
	styleUrls: [ './voucher-type.component.css' ]
} )
export class ProductComponent
{
	constructor ( private $: ProductService ) { }
}
