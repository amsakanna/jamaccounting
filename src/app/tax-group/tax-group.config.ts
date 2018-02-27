import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { TaxGroup } from "../model";

export const moduleName = 'TaxGroup';
export const actionPrefix = '[TaxGroup]';
export const urlParamKey = 'taxGroup';

export const emptyItem: TaxGroup = {
	name: null,
	taxesKey: [],
	taxes: []
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
