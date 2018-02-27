import { Component } from "@angular/core";
import { ProductService } from "./product.service";

@Component( {
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: [ './product-form.component.css' ]
} )
export class ProductFormComponent
{
	constructor ( private $: ProductService ) { }

	public setFeaturesFromCategory (): void
	{
		this.$.formItem.features = this.$.formItem.category.features.map( feature => ( { name: feature.name, value: null } ) );
	}

}
