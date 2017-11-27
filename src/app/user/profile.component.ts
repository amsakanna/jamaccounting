import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModuleState } from './user.state';
import { User } from '../../jam-auth/jam-auth';

@Component( {
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
} )
export class ProfileComponent implements OnInit
{

	private user: User;

	constructor ( private store: Store<UserModuleState> )
	{
		this.store.select( state => state.authState )
			.subscribe( authState => this.user = authState.user );
	}

	ngOnInit () { }

}
