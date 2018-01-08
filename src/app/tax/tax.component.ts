import { Component } from "@angular/core";
import { TaxService } from "./tax.service";

@Component( {
	selector: 'app-tax',
	templateUrl: './tax.component.html',
	styleUrls: [ './tax.component.css' ]
} )
export class TaxComponent
{
	constructor ( private $: TaxService ) { }
}