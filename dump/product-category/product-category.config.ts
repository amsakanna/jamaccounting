import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductCategory } from "../model";

export namespace config
{

	export const moduleName = 'ProductCategory';
	export const actionPrefix = '[ProductCategory]';
	export const urlParamKey = 'product-category';

	export const emptyItem: ProductCategory = {
		name: '',
		id: '',
		parentKey: '',
		picture: null,
		features: []
	};

	export const form = new FormGroup( {
		name: new FormControl( '', Validators.required ),
		id: new FormControl( '' )
	} );

	export const additionalStates = {
		emptyItem: emptyItem,
		form: form
	}

}
