import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BrandService } from "./brand.service";

@Component( {
	selector: 'app-brand-detail',
	templateUrl: './brand-detail.component.html',
	styleUrls: [ './brand-detail.component.css' ]
} )
export class BrandDetailComponent
{
	constructor ( private $: BrandService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ 'brand' ] || '';
		this.$.checkAndSelect( key );
	}
}