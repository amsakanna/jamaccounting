import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { TaxType } from "../model";

export const moduleName = 'TaxType';
export const actionPrefix = '[TaxType]';
export const urlParamKey = 'taxType';

export const emptyItem: TaxType = {
	name: null,
	fullName: null
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	fullName: new FormControl( '' )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
