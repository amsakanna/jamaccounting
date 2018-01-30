import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./voucher-type.service";
import { config } from "./voucher-type.config";

@Component( {
	selector: 'app-voucher-type-detail',
	templateUrl: './voucher-type-detail.component.html',
	styleUrls: [ './voucher-type-detail.component.css' ]
} )
export class ProductDetailComponent
{
	constructor ( private $: ProductService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ config.urlParamKey ] || '';
		this.$.checkAndSelect( key );
	}
}
