import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventManager, Events } from '../../jam-event-manager/jam-event-manager';
import { AuthService } from "../services/auth.service";
import { User } from "../models/user.model";

@Component({
  selector: 'jam-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit
{

	@Input() domainName: string;
	@Output() signIn: EventEmitter<User>;
	@Output() register: EventEmitter<any>;
	
	private formGroup: FormGroup;
	
	constructor(private formBuilder: FormBuilder,
				private eventManager: EventManager,
				private authService: AuthService)
	{
		this.signIn = new EventEmitter<User>();
		this.register = new EventEmitter<any>();
	}
	
	ngOnInit()
	{
		this.formGroup = this.formBuilder.group({
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		});
	}

	private get email() : any
	{
		return this.formGroup.get( 'email' );
	}
	private get password() : any
	{
		return this.formGroup.get( 'password' );
	}

	private _register()
	{
		this.register.emit();
	}
	
	private _signIn()
	{
		const user = new User( { email: this.email.value, password: this.password.value } );
		this.eventManager.emitAuthEvent( Events.SignInRequested );
		this.authService.signIn( user );
		this.signIn.emit( user );
	}

	private _submit()
	{
		if( this.formGroup.status == 'VALID' ) {
			this._signIn();
		}
	}

}
