import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoucherType } from "../model";

export namespace config
{

	export const moduleName = 'VoucherType';
	export const actionPrefix = '[VoucherType]';
	export const urlParamKey = 'voucher-type';

	export const emptyItem: VoucherType = {
		name: '',
		parentKey: '',
	};

	export const form = new FormGroup( {
		name: new FormControl( '', Validators.required ),
	} );

	export const additionalStates = {
		emptyItem: emptyItem,
		form: form,
		selectedItemParent: null,
	}

}
