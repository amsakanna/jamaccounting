import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class IdValidators {

	constructor() { }

	public static companyIdValidator() : ValidatorFn
	{
		return ( control: AbstractControl ): {[key: string]: any} => {
			var id: string = control.value;
			var pattern = /^[a-zA-Z0-9-]*$/;
			return pattern.test( id ) ? null : { 'invalid': true };
		}
	}

}
