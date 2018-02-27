import { Component } from "@angular/core";
import { TaxGroupService } from "./tax-group.service";

@Component( {
	selector: 'app-tax-group-detail',
	templateUrl: './tax-group-detail.component.html',
	styleUrls: [ './tax-group-detail.component.css' ]
} )
export class TaxGroupDetailComponent
{
	constructor ( private $: TaxGroupService ) { }
}
