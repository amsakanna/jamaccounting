import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';
import { CompanyAction } from './company.actions';
import { Company } from './company.model';
import { UserAccount } from './../user/user-account.model';

@Component( {
	selector: 'app-company-page',
	templateUrl: './company-page.component.html',
	styleUrls: [ './company-page.component.css' ]
} )
export class CompanyPageComponent implements OnInit
{

	private companyList: Company[];

	constructor ( private store: Store<CompanyModuleState> )
	{
		this.store.select( state => state.userState.userAccount )
			.subscribe( userAccount => this.store.dispatch( new CompanyAction.Initialize( userAccount ) ) )

		this.store.select( state => state.companyState.list )
			.subscribe( list => this.companyList = list );
	}

	ngOnInit ()
	{
	}

	select ( company: Company )
	{
		this.store.dispatch( new CompanyAction.Select( company.key ) );
	}

	scrollme ( event: MouseWheelEvent )
	{
		document.getElementById( 'company-list' ).scrollLeft += event.deltaY;
	}

}
