import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { ProductCategory } from "../model";

export const moduleName = 'ProductCategory';
export const actionPrefix = '[ProductCategory]';
export const urlParamKey = 'product-category';

export const emptyItem: ProductCategory = {
	name: '',
	parentKey: '',
	parent: null,
	picture: null,
	features: []
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
