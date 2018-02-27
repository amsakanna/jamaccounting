import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Product } from "../model";

export const moduleName = 'Product';
export const actionPrefix = '[Product]';
export const urlParamKey = 'product';

export const emptyItem: Product = {
	id: '',
	name: '',
	categoryKey: '',
	category: null,
	brandKey: '',
	brand: null,
	color: '',
	pictures: [],
	features: []
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	id: new FormControl( '' )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form,
	categoryList: [],
	brandList: []
}
