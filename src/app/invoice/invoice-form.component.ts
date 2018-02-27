import { Component } from "@angular/core";
import { InvoiceService } from "./invoice.service";

@Component( {
	selector: 'app-invoice-form',
	templateUrl: './invoice-form.component.html',
	styleUrls: [ './invoice-form.component.css' ]
} )
export class InvoiceFormComponent
{
	constructor ( private $: InvoiceService ) { }
}
