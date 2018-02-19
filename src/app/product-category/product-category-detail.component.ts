import { Component } from "@angular/core";
import { ProductCategoryService } from "./product-category.service";

@Component( {
	selector: 'app-product-category-detail',
	templateUrl: './product-category-detail.component.html',
	styleUrls: [ './product-category-detail.component.css' ]
} )
export class ProductCategoryDetailComponent
{
	constructor ( private $: ProductCategoryService ) { }
}
