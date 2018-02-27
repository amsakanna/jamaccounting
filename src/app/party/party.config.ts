import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Party } from "../model";
import { GstinValidators } from './gstin-validator.directive';

export const moduleName = 'Party';
export const actionPrefix = '[Party]';
export const urlParamKey = 'party';

export const emptyItem: Party = {
	type: null,
	name: null,
	companyRegistrationType: null,
	taxNumber: null
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	taxNumber: new FormControl( '', GstinValidators.gstinValidator() )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
