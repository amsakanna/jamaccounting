import { Component } from "@angular/core";
import { TreeDragDropService } from "primeng/primeng";
import { ProductCategoryService } from "./product-category.service";

@Component( {
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: [ './product-category.component.css' ]
} )
export class ProductCategoryComponent
{
	constructor ( private $: ProductCategoryService, private treeDragDropService: TreeDragDropService ) { }
}