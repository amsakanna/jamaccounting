import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Brand } from "../model";

export const moduleName = 'Brand';
export const actionPrefix = '[Brand]';
export const urlParamKey = 'brand';

export const emptyItem: Brand = {
	name: null,
	logo: null
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	logo: new FormControl( '' )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
