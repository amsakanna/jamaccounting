import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Invoice } from "../model";

export const moduleName = 'Invoice';
export const actionPrefix = '[Invoice]';
export const urlParamKey = 'invoice';

export const emptyItem: Invoice = {
	partyKey: null,
	party: null,
	transactionDate: null,
	lines: [],
	subtotal: 0,
	discount: 0,
	adjustment: 0,
	total: 0,
	narration: null
};

export const form = new FormGroup( {
	transactionDate: new FormControl( '', Validators.required ),
	lines: new FormArray( [] )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form,
	taxList: [],
	taxGroupList: [],
	taxTypeList: [],
	partyList: [],
	inventoryList: []
}
