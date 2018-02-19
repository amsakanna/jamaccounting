import { Component } from "@angular/core";
import { TaxService } from "./tax.service";

@Component( {
	selector: 'app-tax-detail',
	templateUrl: './tax-detail.component.html',
	styleUrls: [ './tax-detail.component.css' ]
} )
export class TaxDetailComponent
{
	constructor ( private $: TaxService ) { }
}
