import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Tax, Taxabilities } from "../model";

export const moduleName = 'Tax';
export const actionPrefix = '[Tax]';
export const urlParamKey = 'tax';

export const emptyItem: Tax = {
	name: null,
	typeKey: null,
	type: null,
	rate: null,
	flatRate: null,
	perUnits: null
};

export const form = new FormGroup( {
	name: new FormControl( '', Validators.required ),
	rate: new FormControl( null ),
	flatRate: new FormControl( null ),
	perUnits: new FormControl( null )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form,
	taxList: []
}
