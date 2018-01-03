import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModuleState } from './user.state';
import { NavigatorAction } from '../../jam/navigator';
import { Pages } from '../model';
import { KeyValue } from '../../jam/model-library';

@Component( {
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: [ './companies.component.css' ]
} )
export class CompaniesComponent implements OnInit
{

	private list: Array<string>;

	constructor ( private store: Store<UserModuleState> ) { }

	ngOnInit ()
	{
		this.store.select( state => state.userState.userAccount )
			.subscribe( userAccount => this.list = userAccount ? userAccount.companies : [] );
	}

	private select ( companyKey: string )
	{
		this.store.dispatch( new NavigatorAction.Navigate( Pages.Company, [ { key: 'company', value: companyKey }] ) )
	}

	private create ()
	{
		this.store.dispatch( new NavigatorAction.Navigate( Pages.CreateCompany ) );
	}

}
