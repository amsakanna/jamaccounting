import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from './jam-auth.actions';
import { User } from "./user.model";
import { Credential } from './credential.model';

@Component( {
	selector: 'jam-auth-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.css' ]
} )
export class SignInComponent implements OnInit
{

	/**
	 * Class constructors
	 */

	private formGroup: FormGroup;

	constructor ( private store: Store<AuthModuleState>, private formBuilder: FormBuilder ) { }

	ngOnInit ()
	{
		this.formGroup = this.buildForm();
	}

	/**
	 * Form related functions
	 */

	private buildForm (): FormGroup
	{
		return this.formBuilder.group( {
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
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
		this.store.dispatch( new AuthAction.SignIn( credential ) );
	}

	private get email (): any
	{
		return this.formGroup.get( 'email' );
	}
	private get password (): any
	{
		return this.formGroup.get( 'password' );
	}

	/**
	 * Component funtions
	 */

	private requestRegisterPage ()
	{
		this.store.dispatch( new AuthAction.RequestRegisterPage() );
	}

}
