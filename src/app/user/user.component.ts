import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModuleState, UserAction } from './user.store';

@Component( {
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: [ './user.component.css' ]
} )
export class UserComponent implements OnInit
{

	constructor ( private store: Store<UserModuleState> )
	{
		this.store.dispatch( new UserAction.Load() )
	}

	ngOnInit () { }

}
