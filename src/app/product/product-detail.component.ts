import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.css' ]
} )
export class ProductDetailComponent
{
	constructor ( private $: ProductService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ 'product' ] || '';
		this.$.checkAndSelect( key );
	}
}