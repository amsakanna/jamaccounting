import { Component } from "@angular/core";
import { BrandService } from "./brand.service";

@Component( {
	selector: 'app-brand-form',
	templateUrl: './brand-form.component.html',
	styleUrls: [ './brand-form.component.css' ]
} )
export class BrandFormComponent
{
	constructor ( private $: BrandService ) { }
}
