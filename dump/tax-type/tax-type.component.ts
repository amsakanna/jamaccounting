import { Component } from "@angular/core";
import { TaxTypeService } from "./tax-type.service";

@Component( {
	selector: 'app-tax-type',
	templateUrl: './tax-type.component.html',
	styleUrls: [ './tax-type.component.css' ]
} )
export class TaxTypeComponent
{
	constructor ( private $: TaxTypeService ) { }
}