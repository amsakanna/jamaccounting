import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./product.service";
import { config } from "./product.config";

@Component( {
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.css' ]
} )
export class ProductDetailComponent
{
	constructor ( private $: ProductService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ config.urlParamKey ] || '';
		this.$.checkAndSelect( key );
	}
}
