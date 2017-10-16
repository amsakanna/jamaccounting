import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { EventManager, Events } from '../../jam-event-manager/jam-event-manager';
import { AuthService } from '../services/auth.service';
import { AuthFormValidators } from '../directives/auth-form.validator';
import { User } from "../models/user.model";
import { Roles } from '../enums/roles.enum';

@Component({
	selector: 'jam-auth-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{

	@Input() domainName: string;
	@Input() role: Roles;
	private formGroup: FormGroup;
	@Output() register: EventEmitter<User>;
	
	constructor(private formBuilder: FormBuilder,
				private eventManager: EventManager,
				private authService: AuthService)
	{
		this.register = new EventEmitter<User>();
	}
	
	ngOnInit()
	{
		this.formGroup = this.formBuilder.group({
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] ),
			confirmPassword: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		});
		this.confirmPassword.setValidators( AuthFormValidators.confirmPasswordValidator( this.password ) );
	}

	private get email() : AbstractControl
	{
		return this.formGroup.get( 'email' );
	}
	private get password() : AbstractControl
	{
		return this.formGroup.get( 'password' );
	}
	private get confirmPassword() : AbstractControl
	{
		return this.formGroup.get( 'confirmPassword' );
	}

	private _register()
	{
		const user = new User( { email: this.email.value, password: this.password.value, role: this.role } );
		this.eventManager.emitAuthEvent( Events.RegisterRequested );
		this.authService.register( user );
		this.register.emit( user );
	}
	
	private _submit()
	{
		if( this.formGroup.status == 'VALID' ) {
			this._register();
		}
	}

}
