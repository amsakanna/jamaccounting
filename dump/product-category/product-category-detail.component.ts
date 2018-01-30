import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductCategoryService } from "./product-category.service";
import { config } from "./product-category.config";

@Component( {
	selector: 'app-product-category-detail',
	templateUrl: './product-category-detail.component.html',
	styleUrls: [ './product-category-detail.component.css' ]
} )
export class ProductCategoryDetailComponent
{
	constructor ( private $: ProductCategoryService, private activatedRoute: ActivatedRoute )
	{
		const key: string = this.activatedRoute.snapshot.params[ config.urlParamKey ] || '';
		this.$.checkAndSelect( key );
	}
}
