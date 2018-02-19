import { Component } from "@angular/core";
import { BrandService } from "./brand.service";

@Component( {
	selector: 'app-brand-detail',
	templateUrl: './brand-detail.component.html',
	styleUrls: [ './brand-detail.component.css' ]
} )
export class BrandDetailComponent
{
	constructor ( private $: BrandService ) { }
}
