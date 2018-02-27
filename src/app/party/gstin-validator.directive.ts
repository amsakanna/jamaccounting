import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { isNumber } from 'util';

@Directive( {} )
export class GstinValidators
{

	constructor () { }

	/**
	 * input:
	 * 		[1] gstin input control
	 * exec:
	 * 		[1] check if valid gstin value
	 * output:
	 * 		[1] error - if not valid
	 * 		[2] null - if valid
	 */
	public static gstinValidator (): ValidatorFn
	{
		return ( control: AbstractControl ): ValidationErrors =>
		{
			var gstin: string = ( control.value as string ) || '';

			const isValidGstin = ( gstin: string = '' ): boolean =>
			{
				gstin = gstin.toUpperCase();
				return !!gstin.match( /^([0][1-9]|[1-2][0-9]|[3][0-7])(([A-Z]{5})([0-9]{4})([A-Z]{1})([1-9A-Z]{1}))([Z]{1})([0-9a-zA-Z]{1})$/ );
			}

			return gstin
				? !isValidGstin( gstin )
					? { error: 'Invalid GSTIN' }
					: null
				: { error: 'No GSTIN provided' };
		};
	}

}
