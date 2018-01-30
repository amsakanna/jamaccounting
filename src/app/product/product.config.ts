import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from "../model";

export namespace config
{

	export const moduleName = 'Product';
	export const actionPrefix = '[Product]';
	export const urlParamKey = 'product';

	export const emptyItem: Product = {
		sku: '',
		name: '',
		categoryKey: '',
		brandKey: '',
		color: '',
		pictures: [],
		features: []
	};

	export const form = new FormGroup( {
		name: new FormControl( '', Validators.required ),
		sku: new FormControl( '' )
	} );

	export const additionalStates = {
		emptyItem: emptyItem,
		form: form,
		categoryList: [],
		selectedItemCategory: null,
		brandList: [],
		selectedItemBrand: null
	}

}
