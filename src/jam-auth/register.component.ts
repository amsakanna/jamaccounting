import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthFormValidators } from './auth-form-validators.directive';
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from './jam-auth.actions';
import { User } from "./user.model";
import { Credential } from './credential.model';

@Component( {
	selector: 'jam-auth-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent implements OnInit
{

	/**
	 * Class constructors
	 */

	private formGroup: FormGroup;

	constructor ( private store: Store<AuthModuleState>, private formBuilder: FormBuilder ) { }

	ngOnInit ()
	{
		this.formGroup = this.buildForm();
		this.confirmPassword.setValidators( AuthFormValidators.confirmPasswordValidator( this.password ) );
	}

	/**
	 * Form related functions
	 */

	private buildForm (): FormGroup
	{
		return this.formBuilder.group( {
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] ),
			confirmPassword: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		} );
	}

	private buildModel (): Credential
	{
		return new Credential( this.email.value, this.password.value );
	}

	private submit ()
	{
		if ( this.formGroup.status == 'INVALID' ) return;
		const credential = this.buildModel();
		this.store.dispatch( new AuthAction.Register( credential ) );
	}

	private get email (): AbstractControl
	{
		return this.formGroup.get( 'email' );
	}
	private get password (): AbstractControl
	{
		return this.formGroup.get( 'password' );
	}
	private get confirmPassword (): AbstractControl
	{
		return this.formGroup.get( 'confirmPassword' );
	}

}