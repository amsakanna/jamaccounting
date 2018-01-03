import { Component } from "@angular/core";
import { ProductCategoryService } from "./product-category.service";

@Component( {
	selector: 'app-product-category-form',
	templateUrl: './product-category-form.component.html',
	styleUrls: [ './product-category-form.component.css' ]
} )
export class ProductCategoryFormComponent
{
	constructor ( private $: ProductCategoryService ) { }
}