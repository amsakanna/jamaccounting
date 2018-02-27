import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Invoice } from "../model";

export const moduleName = 'Invoice';
export const actionPrefix = '[Invoice]';
export const urlParamKey = 'invoice';

export const emptyItem: Invoice = {
	partyKey: null,
	transactionDate: null,
	lines: [],
	subtotal: 0,
	total: 0,
};

export const form = new FormGroup( {
	transactionDate: new FormControl( '', Validators.required )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
