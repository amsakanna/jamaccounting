import { Component } from "@angular/core";
import { TaxService } from "./tax.service";

@Component( {
	selector: 'app-tax-form',
	templateUrl: './tax-form.component.html',
	styleUrls: [ './tax-form.component.css' ]
} )
export class TaxFormComponent
{
	constructor ( private $: TaxService ) { }
}
