import { Component } from "@angular/core";
import { TaxTypeService } from "./tax-type.service";

@Component( {
	selector: 'app-tax-type-form',
	templateUrl: './tax-type-form.component.html',
	styleUrls: [ './tax-type-form.component.css' ]
} )
export class TaxTypeFormComponent
{
	constructor ( private $: TaxTypeService ) { }
}
