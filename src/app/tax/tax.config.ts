import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Tax, Taxabilities } from "../model";

export const moduleName = 'Tax';
export const actionPrefix = '[Tax]';
export const urlParamKey = 'tax';

export const emptyItem: Tax = {
	name: null,
	typeKey: null,
	taxability: Taxabilities.Undefined,
	rate: null
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	type: new FormControl( null ),
	rate: new FormControl( null )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form,
	categoryList: [],
	selectedItemCategory: null,
	brandList: [],
	selectedItemBrand: null
}
