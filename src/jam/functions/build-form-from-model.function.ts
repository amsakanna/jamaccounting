import { FormGroup } from "@angular/forms";

export function buildFormFromModel<T>( model: T, form: FormGroup ): FormGroup
{
	Object.keys( form ).forEach( property =>
		form.controls[ property ] = model[ property ]
			? model[ property ]
			: form.controls[ property ].value );
	return form;
}
