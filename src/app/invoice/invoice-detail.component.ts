import { Component } from "@angular/core";
import { InvoiceService } from "./invoice.service";

@Component( {
	selector: 'app-invoice-detail',
	templateUrl: './invoice-detail.component.html',
	styleUrls: [ './invoice-detail.component.css' ]
} )
export class InvoiceDetailComponent
{
	constructor ( private $: InvoiceService ) { }
}
