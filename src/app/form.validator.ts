import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class FormValidators {

	constructor() { }

	public static confirmPasswordValidator( passwordControl: AbstractControl ): ValidatorFn
	{
		return (control: AbstractControl): {[key: string]: any} => {
			// passwordControl is "original password input"
			// control is "confirm password input"
			return ( passwordControl.value == control.value ) ? null : { 'no-match': true };
		};
	}

}
