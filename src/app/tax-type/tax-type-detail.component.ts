import { Component } from "@angular/core";
import { TaxTypeService } from "./tax-type.service";

@Component( {
	selector: 'app-tax-type-detail',
	templateUrl: './tax-type-detail.component.html',
	styleUrls: [ './tax-type-detail.component.css' ]
} )
export class TaxTypeDetailComponent
{
	constructor ( private $: TaxTypeService ) { }
}
