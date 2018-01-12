import { Component } from "@angular/core";
import { BrandService } from "./brand.service";

@Component( {
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: [ './brand.component.css' ]
} )
export class BrandComponent
{
	constructor ( private $: BrandService ) { }
}