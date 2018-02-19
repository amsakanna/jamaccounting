import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaxService } from "./tax.service";

@Component( {
	selector: 'app-tax-detail',
	templateUrl: './tax-detail.component.html',
	styleUrls: [ './tax-detail.component.css' ]
} )
export class TaxDetailComponent
{
	constructor ( private $: TaxService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ 'tax' ] || '';
		this.$.checkAndSelect( key );
	}
}